import { baseURL } from "../Components/App";
// import { useAppSelector } from "../redux/hooks";
import { IFetchData, IFetchInstance } from "../types/fetchInstance";
// import { useDispatch } from 'react-redux';
import { addUser } from "../redux/user";
import inMemoryJwt from "./inMemoryJwt";

let originalRequest = async (url: RequestInfo, config: RequestInit = {}): Promise<IFetchInstance> => {
  url = `${baseURL}${url}`
  let response = await fetch(url, config)
  let body = await response.json()
  return { fetchObject: { response, body } }
}

let refreshToken = async () => {
  let response = await fetch(`${baseURL}/api/auth/refreshToken`, { method: 'GET', credentials: 'include', })
  let body = await response.json()
  return { response, body } as IFetchData
}

function checkTokenIsExpired(refTokenObject: IFetchData) {
  if (refTokenObject.body.error && refTokenObject.body.error.message === 'TokenExpiredError') {
    return [true, refTokenObject] as const
  }
  return [false, refTokenObject] as const
}

let customFetcher = async (url: any, config: RequestInit = {}): Promise<IFetchInstance> => {
  // const userData = useAppSelector(state => state.user.data)
  // const dispatch = useDispatch();

  // const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();

  // let accessToken = userData.accesToken
  let accessToken = inMemoryJwt.getToken()

  // config.headers
  config['headers'] = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }

  let { fetchObject }: IFetchInstance = await originalRequest(url, config)

  if ([401, 403].includes(fetchObject.response.status)) {
    const [expired, checkedRefTokenObject] = checkTokenIsExpired(await refreshToken())
    if (expired) return { fetchObject: checkedRefTokenObject }

    inMemoryJwt.setToken(checkedRefTokenObject.body.accessToken)
    // dispatch(addUser(checkedRefTokenObject.body.accessToken as string))

    config['headers'] = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${checkedRefTokenObject.body.accessToken}`
    }

    let originalReqAgain = await originalRequest(url, config)

    fetchObject = originalReqAgain.fetchObject
  }

  return { fetchObject }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

interface TokenData {
  accessToken: string
  refreshToken: string
}

type TokenResponse = ResponseErrorHandler & TokenData

export interface ResponseErrorHandler {
  error: {
    message: string,
    reason: string, expiredAt: Date
  }
}

export const fetchWrapper = (
  urlPath: string,
  resolve: (res: any) => any,
  reject?: (error: Error) => any,
  init?: RequestInit
) => {
  const url = `${baseURL}${urlPath}`
  const defaultReject = (err: Error) => { console.log("defaultReject ", err) }
  return fetch(url, init)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject !== undefined ? defaultReject : reject)
}

const retryFetchWithNewToken = () => {
  return fetchWrapper("/api/auth/refreshToken",
    (refreshTokenResponse: TokenResponse) => {
      if (refreshTokenResponse.error) throw new Error(JSON.stringify(refreshTokenResponse.error))
      inMemoryJwt.setToken(refreshTokenResponse.accessToken)
    },
    undefined, { method: 'GET', credentials: 'include', })
}

export const newFetch =
  <T extends ResponseErrorHandler>(
    url: string,
    newFetchResolve: (res: T) => T | void,
    reject?: () => any,
    config?: RequestInit) => {

    const firstFetchResolve = async (response: T) => {
      // console.log("firstFetchResolve response.ok: ", response, response.error ? 1 : 2)
      if (response.error) {
        await retryFetchWithNewToken()
        fetchWrapper(url, newFetchResolve, undefined, setConfigHeader(config, inMemoryJwt.getToken()))
      } else {
        // console.log('resolve(response)');
        return newFetchResolve(response)
      }
    }
    fetchWrapper(url, firstFetchResolve, undefined, setConfigHeader(config, inMemoryJwt.getToken()))

  }

function setConfigHeader(config: RequestInit = {}, accessToken: string | null) {
  console.log("accessToken ---> ", accessToken);

  config['headers'] = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
  return config
}


export default customFetcher;