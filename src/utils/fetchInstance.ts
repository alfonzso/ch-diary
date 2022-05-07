import inMemoryJWTManager from "./inMemoryJwt"

let baseURL = 'http://localhost:2602'

let originalRequest = async (url: RequestInfo, config: RequestInit | undefined) => {
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
  // console.debug("saved-token--->", data.accessToken)
  inMemoryJWTManager.setToken(data.accessToken)
  return data.accessToken
}

let customFetcher = async (url: any, config: any = {}) => {
  let accessToken = inMemoryJWTManager.getToken()
  // console.debug("getToken-====--->", accessToken)

  config['headers'] = {
    Authorization: `Bearer ${accessToken}`
  }

  // console.debug('Before Request')
  let { response, data } = await originalRequest(url, config)
  // console.debug('After Request')

  if (response.statusText === 'Unauthorized') {
    accessToken = await refreshToken()

    config['headers'] = {
      Authorization: `Bearer ${accessToken}`
    }

    let newResponse = await originalRequest(url, config)
    response = newResponse.response
    data = newResponse.data

  }

  return { response, data }
}
export default customFetcher;