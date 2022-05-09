import { IFetchData, IFetchInstance } from "../types/fetchInstance";
import inMemoryJWTManager from "./inMemoryJwt"

let baseURL = 'http://localhost:2602'

let originalRequest = async (url: RequestInfo, config: RequestInit = {}): Promise<IFetchInstance> => {
  url = `${baseURL}${url}`
  let response = await fetch(url, config)
  let body = await response.json()
  return { fetchObject: { response, body } }
}

let refreshToken = async () => {
  let response = await fetch(`${baseURL}/api/v1/auth/refreshToken`, { method: 'GET', credentials: 'include', })
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
  let accessToken = inMemoryJWTManager.getToken()

  config['headers'] = {
    Authorization: `Bearer ${accessToken}`
  }

  let { fetchObject }: IFetchInstance = await originalRequest(url, config)

  if ([401, 403].includes(fetchObject.response.status)) {
    const [expired, checkedRefTokenObject] = checkTokenIsExpired(await refreshToken())
    if (expired) return { fetchObject: checkedRefTokenObject }

    inMemoryJWTManager.setToken(checkedRefTokenObject.body.accessToken)

    config['headers'] = {
      Authorization: `Bearer ${checkedRefTokenObject.body.accessToken}`
    }

    let originalReqAgain = await originalRequest(url, config)

    fetchObject = originalReqAgain.fetchObject
  }

  return { fetchObject }
}
export default customFetcher;