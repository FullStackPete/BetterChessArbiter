import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const useApi = (url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res: AxiosResponse = await axios(url, options);
        setData(res.data);
      } catch (err: any) {
        setErr(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, isLoading, err };
};
