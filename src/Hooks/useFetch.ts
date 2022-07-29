import { useState, useEffect } from "react";
import { newFetch, newFetchWithAuth, ResponseErrorHandler } from "../utils/fetchInstance";

// type UserPayload = {
//   userId: string;
//   email: string;
// };

// interface TestData {
//   data: UserPayload | undefined;
//   success: boolean;
//   message: string;
// }

// type TestResponse = ResponseErrorHandler & TestData

const useFetch = <T extends ResponseErrorHandler>(url: string, config: RequestInit = {}) => {
  const [data, setData] = useState([] as unknown as T);

  useEffect(() => {
    // newFetchWithAuth<TestResponse>(url,
    //   (data) => {
    //     console.log("setData(data) ", data)
    //     setData(data)
    //   }
    // )
    newFetch<T>({
      url,
      newFetchResolve: (response) => {
        setData(response)
      }
    })

  }, []);

  return data;
};

export default useFetch;