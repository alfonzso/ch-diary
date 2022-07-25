import { useState, useEffect } from "react";
import { newFetchWithAuth, ResponseErrorHandler } from "../utils/fetchInstance";

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

const useFetch = <T>(url: string, config: RequestInit = {}) => {
  const [data, setData] = useState([] as unknown as TestResponse);

  useEffect(() => {
    newFetchWithAuth<TestResponse>(url,
      (data) => {
        console.log("setData(data) ", data)
        setData(data)
      }
    )
  }, []);

  return data;
};

export default useFetch;