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

  const retryFetchWithNewToken = () => {
    const resolve = (refreshTokenResponse: TokenResponse) => {
      if (refreshTokenResponse.error) throw new Error(JSON.stringify(refreshTokenResponse.error))
      inMemoryJwt.setToken(refreshTokenResponse.accessToken)
    }
    return fetchWrapper("/api/auth/refreshToken", resolve, undefined, { method: 'GET', credentials: 'include', })
  }

  const newFetch = <T extends ResponseErrorHandler>(newFetchResolve: (res: T) => T | void, reject?: () => any) => {

    const firstFetchResolve = async (response: T) => {
      console.log("firstFetchResolve response.ok: ", response, response.error ? 1 : 2)
      if (response.error) {
        await retryFetchWithNewToken()
        fetchWrapper(url, newFetchResolve, undefined, setConfigHeader(config, inMemoryJwt.getToken()))

      } else {
        console.log('resolve(response)');
        return newFetchResolve(response)
      }
    }
    fetchWrapper(url, firstFetchResolve, undefined, setConfigHeader(config, inMemoryJwt.getToken()))

  }

  useEffect(() => {
    newFetch<TestResponse>(
      (data) => {
        console.log("setData(data) ", data)
        setData(data)
      }
    )
  }, []);

  return data;
};

export default useFetch;