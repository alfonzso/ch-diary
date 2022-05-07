// export let fafa = "keke"
// import Cookies from 'js-cookie'

import inMemoryJWTManager from "./inMemoryJwt"

// let baseURL = 'http://127.0.0.1:2602'
let baseURL = 'http://localhost:2602'

let originalRequest = async (url: RequestInfo, config: RequestInit | undefined) => {
  url = `${baseURL}${url}`
  let response = await fetch(url, config)
  let data = await response.json()
  console.log('REQUESTING:', data)
  return { response, data }
}

let refreshToken = async () => {

  let response = await fetch(`${baseURL}/api/v1/auth/refreshToken`, {
    method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    credentials: 'include',
    // credentials: "same-origin",
    // body: JSON.stringify({ 'refresh': refreshToken })
  })
  let data = await response.json()
  console.log("saved-token--->", data.accessToken)
  inMemoryJWTManager.setToken(data.accessToken)
  // localStorage.setItem('authTokens', JSON.stringify(data))
  return data.accessToken
}


let customFetcher = async (url: any, config: any = {}) => {
  // let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  // let accessToken = Cookies.get('refresh_token')
  let accessToken = inMemoryJWTManager.getToken()
  console.log("getToken-====--->", accessToken)

  // const user = jwt_decode(authTokens.access)
  // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  // if(isExpired){
  //     authTokens = await refreshToken(authTokens)
  // }

  //Proceed with request

  config['headers'] = {
    Authorization: `Bearer ${accessToken}`
  }
  // config['credentials'] = 'include'


  console.log('Before Request')
  let { response, data } = await originalRequest(url, config)
  console.log('After Request')

  console.log("---->", response.statusText)

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