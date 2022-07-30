import { store } from "../redux/store";
import { updateUserToken } from "../redux/userSlice";
import { chAppconfig } from "../config";
import { getUserStore } from "../redux/hooks";
import { TokenResponse } from "../types";
import inMemoryJwt from "./inMemoryJwt";

export interface ResponseErrorHandler {
  error: {
    message: string,
    reason: string, expiredAt: Date
  }
}

const updateToken = (token: string) => {
  store.dispatch(updateUserToken(token))
}

const fetchWrapper = (
  urlPath: string,
  resolve?: (res: any) => any,
  reject?: ((error: Error) => any) | null,
  init?: RequestInit
) => {
  const url = urlPath.includes("http") ? urlPath : `${chAppconfig.baseURL}${urlPath}`
  const defaultReject = (err: Error) => { console.log("defaultReject ", err) }
  return fetch(url, init)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject !== null ? reject : defaultReject)
}

const retryFetchWithNewToken = (
  tokenReject: ((error: Error) => any) | null = null,
) => {
  return fetchWrapper(
    "/api/auth/refreshToken",
    (refreshTokenResponse: TokenResponse) => {
      if (refreshTokenResponse.error) throw new Error(JSON.stringify(refreshTokenResponse.error))
      inMemoryJwt.setToken(refreshTokenResponse.accessToken)
      updateToken(refreshTokenResponse.accessToken)
    },
    tokenReject,
    { method: 'GET', credentials: 'include', }
  )
}

type newFetchWithAuthParams<T> = {
  url: string
  config?: RequestInit
  newFetchResolve?: (res: T) => T | void
  newFetchReject?: ((error: Error) => any) | null
  tokenReject?: ((error: Error) => any) | null
}

export const newFetchWithAuth =
  <T extends ResponseErrorHandler>({
    url,
    config,
    newFetchResolve = () => { },
    newFetchReject = () => { },
    tokenReject = () => { },
  }: newFetchWithAuthParams<T>
  ) => {

    const firstFetchResolve = async (response: T) => {
      if (response.error) {
        await retryFetchWithNewToken(tokenReject)
        return fetchWrapper(url, newFetchResolve, newFetchReject, setTokenInHeader(config))
      } else {
        return newFetchResolve(response)
      }
    }

    return fetchWrapper(url, firstFetchResolve, newFetchReject, setTokenInHeader(config))
  }

export const newFetch =
  <T extends ResponseErrorHandler>({
    url,
    config,
    newFetchResolve = () => { },
    newFetchReject = () => { },
  }: newFetchWithAuthParams<T>
  ) => {

    return fetchWrapper(
      url,
      (response: T) => {
        if (response.error) throw new Error(JSON.stringify(response.error))
        return newFetchResolve(response)
      },
      newFetchReject,
      config
    )
  }

function setTokenInHeader(config: RequestInit = {}) {
  config['headers'] = {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${getUserDataFromStore().accesToken}`
    Authorization: `Bearer ${getUserStore().accesToken}`
  }
  return config
}


// export default customFetcher;