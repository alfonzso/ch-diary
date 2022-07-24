import { useState, useEffect } from "react";
import { baseURL } from "../Components/App";
import inMemoryJwt from "../utils/inMemoryJwt";


function setConfigHeader(config: RequestInit = {}, accessToken: string | null) {
  config['headers'] = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
  return config
}

interface TokenError {
  error?: {
    message: string,
    reason: string, expiredAt: Date
  }
}

interface TokenData {
  accessToken?: string
  refreshToken?: string
}

type TokenResponse = TokenError & TokenData

// interface CustomRequest<T> extends Request {
//   body: T
// }

const useFetch = <T>(url: string, config: RequestInit = {}) => {
  const [data, setData] = useState([] as unknown as T);


  // fetchAgainWithGoodToken
  const fetchAgainWithGoodToken = () => {
    // let refreshTokenResponse = await
    return fetch(`${baseURL}/api/auth/refreshToken`, { method: 'GET', credentials: 'include', })
      .then((response) => response.json())
      // .then((response) => {
      //   if (response.ok) {
      //     return response.json();
      //   }
      // })
      .then((refreshTokenResponse: TokenResponse) => {
        if (refreshTokenResponse.error) throw new Error(JSON.stringify(refreshTokenResponse.error))
        console.log("refreshTokenResponse ", refreshTokenResponse);
        // let refTokenAccesToken = await refreshTokenResponse.json() as accessTokenAndRefreshToken
        inMemoryJwt.setToken(refreshTokenResponse.accessToken!)
      })

  }

  useEffect(() => {
    const fixedUrl = url.includes('https') ? url : `${baseURL}${url}`
    const fetchTest = fetch.bind(null, fixedUrl, setConfigHeader(config, inMemoryJwt.getToken()))
    // fetch(fixedUrl, setConfigHeader(config, inMemoryJwt.getToken()))
    fetchTest()
      .then(async (response) => {
        console.log("response.ok: ", response.ok)
        if (response.ok) {
          return response.json();
        }
        // throw new Error(response.status);
        // let refreshTokenResponse = await fetch(
        //   `${baseURL}/api/auth/refreshToken`,
        //   { method: 'GET', credentials: 'include', }
        // )
        // console.log("refreshTokenResponse ", refreshTokenResponse);
        // let refTokenAccesToken = await refreshTokenResponse.json() as accessTokenAndRefreshToken
        // inMemoryJwt.setToken(refTokenAccesToken.accessToken)

        await fetchAgainWithGoodToken()

        // let newResponse = await fetch(fixedUrl, setConfigHeader(config, inMemoryJwt.getToken()))
        let newResponse = await fetchTest()
        console.log("newResponse.ok: ", newResponse.ok)
        if (newResponse.ok) {
          return response.json();
        }
      })
      .then((data) => setData(data))
      .catch(err => {
        console.log(err);
      })
    // .catch(err => {
    //   console.log("err ", err)
    // });
  }, [url]);

  return data;
};

export default useFetch;