import { useState, useEffect } from "react";
import { baseURL } from "../Components/App";

const useFetch = <T>(url: string, config: RequestInit = {}) => {
  const [data, setData] = useState([] as unknown as T);

  useEffect(() => {
    const fixedUrl = url.includes('https') ? url : `${baseURL}${url}`
    fetch(fixedUrl, config)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
};

export default useFetch;