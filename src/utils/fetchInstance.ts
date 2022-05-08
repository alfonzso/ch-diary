// import { tokenToString } from "typescript";
import exp from "constants";
import { IFetchData, IFetchInstance } from "../types/fetchInstance";
import inMemoryJWTManager from "./inMemoryJwt"

let baseURL = 'http://localhost:2602'

// type fetchData = {
//   response: Response;
//   data: any;
//   type?: string
// }

// type fetchInstance = {
//   fetchObject: {
//     response: Response;
//     body: any;
//     type?: string
//   }
// }

let originalRequest = async (url: RequestInfo, config: RequestInit = {}): Promise<IFetchInstance> => {
  url = `${baseURL}${url}`
  let response = await fetch(url, config)
  let body = await response.json()
  return { fetchObject: { response, body } }
}

let refreshToken = async () => {
  let response = await fetch(`${baseURL}/api/v1/auth/refreshToken`, {
    method: 'GET',
    credentials: 'include',
  })
  let body = await response.json()
  return { fetchObject: { response, body, type: body.type! } } as IFetchInstance
  // return fetchObject
}


// function checkTokenIsExpired({ fetchObject: refTokenObject }: IFetchInstance, { fetchObject }: IFetchInstance) {
// function checkTokenIsExpired({ fetchObject: refTokenObject }: IFetchInstance, { fetchObject }: IFetchInstance) {
function checkTokenIsExpired(refTokenObject: IFetchData, fetchObject: IFetchData) {
  if (refTokenObject.type === 'TokenExpiredError') {
    fetchObject.type = 'TokenExpiredError'
    return { expired: true, fetchObject }
  }
  return { expired: true, fetchObject }
}

let customFetcher = async (url: any, config: RequestInit = {}): Promise<IFetchInstance> => {
  let accessToken = inMemoryJWTManager.getToken()

  config['headers'] = {
    Authorization: `Bearer ${accessToken}`
  }

  let { fetchObject }: IFetchInstance = await originalRequest(url, config)

  if (fetchObject.response.statusText === 'Unauthorized') {
    // let { fetchObject: refTokenObject } = await refreshToken()
    let { fetchObject: refTokenObject } = await refreshToken()
    // if (data.type === 'TokenExpiredError') return <Redirect to='/login' />
    // if (refTokenData.type === 'TokenExpiredError') return refTokenData
    // if (refTokenObject.type === 'TokenExpiredError') return { fetchObject }
    // let expired: boolean = false
    // { expired, refTokenObject } = checkTokenIsExpired(refTokenObject, { fetchObject: fetchObject })
    // let { expired, { fetchObject: refTokenObject } } = checkTokenIsExpired({ fetchObject: refTokenObject }, { fetchObject: fetchObject })
    let { expired, fetchObject: checkedRefTokenObject } = checkTokenIsExpired(refTokenObject, fetchObject)
    if (expired) return { fetchObject: checkedRefTokenObject }

    inMemoryJWTManager.setToken(checkedRefTokenObject.body.accessToken)

    // config['headers'] = {
    //   Authorization: `Bearer ${refreshTokenData.accessToken}`
    // }

    let originalReqAgain = await originalRequest(
      url, {
      headers: { Authorization: `Bearer ${checkedRefTokenObject.body.accessToken}` }
    })

    fetchObject = originalReqAgain.fetchObject
  }

  return { fetchObject }
}
export default customFetcher;