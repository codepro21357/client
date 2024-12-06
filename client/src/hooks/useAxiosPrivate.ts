import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux";
import useRefreshToken from "@/hooks/useRefreshToken";
import { api } from "@/services/axios";

const useAxiosPrivate = () => {
  const token = useAppSelector((state) => state.user?.token);
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refreshToken();
          prevRequest.headers.Authorization = `Bearer ${newToken?.token}`;
          return api(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [token, refreshToken]);

  return api;
};

export default useAxiosPrivate;
