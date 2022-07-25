import { baseURL } from "../Components/App";
import { store } from "../redux/store";
import { updateUserToken } from "../redux/user";

import { TokenResponse } from "../types";
import inMemoryJwt from "./inMemoryJwt";

// let originalRequest = async (url: RequestInfo, config: RequestInit = {}): Promise<IFetchInstance> => {
//   url = `${baseURL}${url}`
//   let response = await fetch(url, config)
//   let body = await response.json()
//   return { fetchObject: { response, body } }
// }

// let refreshToken = async () => {
//   let response = await fetch(`${baseURL}/api/auth/refreshToken`, { method: 'GET', credentials: 'include', })
//   let body = await response.json()
//   return { response, body } as IFetchData
// }

// function checkTokenIsExpired(refTokenObject: IFetchData) {
//   if (refTokenObject.body.error && refTokenObject.body.error.message === 'TokenExpiredError') {
//     return [true, refTokenObject] as const
//   }
//   return [false, refTokenObject] as const
// }

// let customFetcher = async (url: any, config: RequestInit = {}): Promise<IFetchInstance> => {
//   // const userData = useAppSelector(state => state.user.data)
//   // const dispatch = useDispatch();

//   // const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

//   // let accessToken = userData.accesToken
//   let accessToken = inMemoryJwt.getToken()

//   // config.headers
//   config['headers'] = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${accessToken}`
//   }

//   let { fetchObject }: IFetchInstance = await originalRequest(url, config)

//   if ([401, 403].includes(fetchObject.response.status)) {
//     const [expired, checkedRefTokenObject] = checkTokenIsExpired(await refreshToken())
//     if (expired) return { fetchObject: checkedRefTokenObject }

//     inMemoryJwt.setToken(checkedRefTokenObject.body.accessToken)
//     // dispatch(addUser(checkedRefTokenObject.body.accessToken as string))

//     config['headers'] = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${checkedRefTokenObject.body.accessToken}`
//     }

//     let originalReqAgain = await originalRequest(url, config)

//     fetchObject = originalReqAgain.fetchObject
//   }

//   return { fetchObject }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

export interface ResponseErrorHandler {
  error: {
    message: string,
    reason: string, expiredAt: Date
  }
}

export const getUserDataFromStore = () => {
  return store.getState().user.data
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
  const url = urlPath.includes("http") ? urlPath : `${baseURL}${urlPath}`
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
    Authorization: `Bearer ${getUserDataFromStore().accesToken}`
  }
  return config
}


// export default customFetcher;