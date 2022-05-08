import { tokenToString } from "typescript";
import inMemoryJWTManager from "./inMemoryJwt"

let baseURL = 'http://localhost:2602'

type fetchData = {
  response: Response;
  data: any;
  type?: string
}

let originalRequest = async (url: RequestInfo, config: RequestInit = {}): Promise<fetchData> => {
  url = `${baseURL}${url}`
  let response = await fetch(url, config)
  let data = await response.json()
  // console.debug('REQUESTING:', data)
  return { response, data }
}

let refreshToken = async () => {

  let response = await fetch(`${baseURL}/api/v1/auth/refreshToken`, {
    method: 'GET',
    credentials: 'include',
  })
  let data = await response.json()
  return data
}

let customFetcher = async (url: any, config: RequestInit = {}): Promise<fetchData> => {
  let accessToken = inMemoryJWTManager.getToken()

  config['headers'] = {
    Authorization: `Bearer ${accessToken}`
  }

  let { response: originalResponse, data: originalData } = await originalRequest(url, config)

  if (originalResponse.statusText === 'Unauthorized') {
    let refTokenData = await refreshToken()
    // if (data.type === 'TokenExpiredError') return <Redirect to='/login' />
    // if (refTokenData.type === 'TokenExpiredError') return refTokenData
    if (refTokenData.type === 'TokenExpiredError') return { response: originalResponse, data: refTokenData, type: refTokenData.type }
    inMemoryJWTManager.setToken(refTokenData.accessToken)

    // config['headers'] = {
    //   Authorization: `Bearer ${refreshTokenData.accessToken}`
    // }

    let originalReqAgain = await originalRequest(
      url, {
      headers: { Authorization: `Bearer ${refTokenData.accessToken}` }
    })

    originalResponse = originalReqAgain.response
    originalData = originalReqAgain.data

  }

  return { response: originalResponse, data: originalData }
}
export default customFetcher;