import { useState, useEffect } from "react";
import { FlowNode } from "typescript";
import { baseURL } from "../Components/App";
import inMemoryJwt from "../utils/inMemoryJwt";


function setConfigHeader(config: RequestInit = {}, accessToken: string | null) {
  console.log("accessToken ---> ", accessToken);

  config['headers'] = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
  return config
}

interface ResponseErrorHandler {
  error: {
    message: string,
    reason: string, expiredAt: Date
  }
}

interface TokenData {
  accessToken: string
  refreshToken: string
}

type TokenResponse = ResponseErrorHandler & TokenData

type UserPayload = {
  userId: string;
  email: string;
};

interface TestData {
  data: UserPayload | undefined;
  success: boolean;
  message: string;
}

type TestResponse = ResponseErrorHandler & TestData

// interface CustomRequest<T> extends Request {
//   body: T
// }

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

const useFetch = <T>(url: string, config: RequestInit = {}) => {
  const [data, setData] = useState([] as unknown as TestResponse);


  // fetchAgainWithGoodToken
  const retryFetchWithNewToken = () => {
    // return fetch(`${baseURL}/api/auth/refreshToken`, { method: 'GET', credentials: 'include', })
    //   .then((response) => response.json())
    //   .then((refreshTokenResponse: TokenResponse) => {
    //     if (refreshTokenResponse.error) throw new Error(JSON.stringify(refreshTokenResponse.error))
    //     inMemoryJwt.setToken(refreshTokenResponse.accessToken)
    //   })

    const resolve = (refreshTokenResponse: TokenResponse) => {
      if (refreshTokenResponse.error) throw new Error(JSON.stringify(refreshTokenResponse.error))
      inMemoryJwt.setToken(refreshTokenResponse.accessToken)
    }
    // const reject = (err: Error) => {
    //   console.log(err)
    // }
    return fetchWrapper("/api/auth/refreshToken", resolve, undefined, { method: 'GET', credentials: 'include', })
  }
  // type voidOr = (res: T) => T | void

  const newFetch = <T extends ResponseErrorHandler>(newFetchResolve: (res: T) => T | void, reject?: () => any) => {
    // const fixedUrl = url.includes('https') ? url : `${baseURL}${url}`
    // const fetchTest = fetch.bind(null, fixedUrl, setConfigHeader(config, inMemoryJwt.getToken()))
    // fetch(fixedUrl, setConfigHeader(config, inMemoryJwt.getToken()))
    // fetchTest()
    //   .then(async (response) => {
    //     console.log("response.ok: ", response.ok)
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     // throw new Error(response.status);
    //     // let refreshTokenResponse = await fetch(
    //     //   `${baseURL}/api/auth/refreshToken`,
    //     //   { method: 'GET', credentials: 'include', }
    //     // )
    //     // console.log("refreshTokenResponse ", refreshTokenResponse);
    //     // let refTokenAccesToken = await refreshTokenResponse.json() as accessTokenAndRefreshToken
    //     // inMemoryJwt.setToken(refTokenAccesToken.accessToken)

    //     await fetchAgainWithGoodToken()

    //     // let newResponse = await fetch(fixedUrl, setConfigHeader(config, inMemoryJwt.getToken()))
    //     let newResponse = await fetchTest()
    //     console.log("newResponse.ok: ", newResponse.ok)
    //     if (newResponse.ok) {
    //       return response.json();
    //     }
    //   })
    //   .then((data) => setData(data))
    //   .catch(err => {
    //     console.log(err);
    //   })

    const firstFetchResolve = async (response: T) => {
      // if (response.error) throw new Error(JSON.stringify(response.error))
      // inMemoryJwt.setToken(refreshTokenResponse.accessToken)
      console.log("firstFetchResolve response.ok: ", response, response.error ? 1 : 2)
      if (response.error) {
        await retryFetchWithNewToken()

        // fetchWrapper(url, (response: T) => {
        //   if (response.error) throw new Error(JSON.stringify(response.error))
        //   return response
        // }, undefined, setConfigHeader(config, inMemoryJwt.getToken()))
        fetchWrapper(url, newFetchResolve, undefined, setConfigHeader(config, inMemoryJwt.getToken()))

      } else {
        console.log('resolve(response)');
        return newFetchResolve(response)
      }
      // if (response.ok) {
      //   return response.json();
      // }
    }
    // const reject = (err: Error) => {
    //   console.log(err)
    // }
    fetchWrapper(url, firstFetchResolve, undefined, setConfigHeader(config, inMemoryJwt.getToken()))

  }

  // newFetch<TestResponse>(
  //   (data) => {
  //     console.log("setData(data) ", data)
  //     setData(data)
  //   }
  // )

  useEffect(() => {
    newFetch<TestResponse>(
      (data) => {
        console.log("setData(data) ", data)
        setData(data)
      }
    )
    // newFetch<TestResponse>(
    //   (data) => {
    //     setData(data)
    //     // return data
    //   }
    // )
    // .catch(err => {
    //   console.log("err ", err)
    // });
  }, []);

  return data;
};

export default useFetch;