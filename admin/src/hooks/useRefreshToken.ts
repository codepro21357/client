import { useState } from "react";
import { useAppDispatch } from "./redux";
import { clearToken, setToken } from "@/redux/slice/userSlice";
import { api } from "@/services/axios";

const useRefreshToken = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const refreshToken = async () => {
    try {
      const res = await api.get("/api/auth/refresh");
      dispatch(setToken(res.data?.token));
      return res.data;
    } catch (err) {
      dispatch(clearToken());
    } finally {
      setLoading(false);
    }
  };

  return { refreshToken, loading };
};

export default useRefreshToken;
