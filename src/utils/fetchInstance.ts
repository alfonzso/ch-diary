import { store } from "../redux/store";
import { updateUserToken } from "../redux/userSlice";
import { chAppconfig } from "../config";
import { getUserStore } from "../redux/hooks";
import { TokenResponse } from "../types";

export interface ResponseErrorHandler {
  error: {
    message: string,
    reason: string, expiredAt: Date
  }
}

const updateToken = (token: string) => {
  store.dispatch(updateUserToken(token))
}

const fetchWrapper = async (
  urlPath: string,
  resolve?: (res: any) => any,
  reject?: ((error: Error) => any) | null,
  init?: RequestInit
) => {
  const url = urlPath.includes("http") ? urlPath : `${chAppconfig.baseURL}${urlPath}`
  const defaultReject = (err: Error) => { console.log("###)()( defaultReject )()(### ", err) }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 5000);

  const response = await fetch(url, { ...init, signal: controller.signal })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject !== null ? reject : defaultReject)

  clearTimeout(id);
  return response;
}

const retryFetchWithNewToken = (
  tokenReject: ((error: Error) => any) | null = null,
) => {
  return fetchWrapper(
    "/api/auth/refreshToken",
    (refreshTokenResponse: TokenResponse) => {
      if (refreshTokenResponse.error) throw new Error(JSON.stringify(refreshTokenResponse.error))
      updateToken(refreshTokenResponse.accessToken)
    },
    tokenReject,
    { method: 'GET', credentials: 'include', }
  )
}

type newFetchWithAuthParams<T, K> = {
  url: string
  config?: RequestInit
  newFetchResolve?: (res: T) => T | void | K
  newFetchReject?: ((error: Error) => any) | null
  tokenReject?: ((error: Error) => any) | null
}

type newFetchParams<T, K> = {
  url: string
  config?: RequestInit
  newFetchResolve?: (res: T) => T | void | K
  newFetchReject?: ((error: Error) => any) | null
  tokenReject?: ((error: Error) => any) | null
}

export const newFetchWithAuth =
  <T extends ResponseErrorHandler, K = T>({
    url,
    config,
    newFetchResolve = () => { },
    newFetchReject = () => { },
    tokenReject = () => { },
  }: newFetchWithAuthParams<T, K>
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
  <T extends ResponseErrorHandler, K = T>({
    url,
    config,
    newFetchResolve = () => { },
    newFetchReject = () => { },
  }: newFetchParams<T, K>
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
    Authorization: `Bearer ${getUserStore().accesToken}`
  }
  return config
}
