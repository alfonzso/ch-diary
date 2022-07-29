import { useState, useEffect } from "react";
import { newFetch, ResponseErrorHandler } from "../utils/fetchInstance";

const useFetch = <T extends ResponseErrorHandler>(url: string, config: RequestInit = {}) => {
  const [data, setData] = useState([] as unknown as T);

  useEffect(() => {
    newFetch<T>({
      url,
      newFetchResolve: (response) => {
        setData(response)
      }
    })

  }, [url]);

  return data;
};

export default useFetch;