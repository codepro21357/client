import { LoginDataType } from "@/app/(routes)/login/schema";
import { RegisterDataType } from "@/app/(routes)/register/schema";
import { AxiosInstance } from "axios";
import { api } from "../axios";
import { ForgotPasswordDataType } from "@/app/(routes)/forgot-password/schema";
import { ResetPasswordDataType } from "@/app/(routes)/reset-password/schema";

interface IRegisterUser extends RegisterDataType {
  captcha: string | null;
}

export const createUser = async (data: IRegisterUser) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginDataType) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const logoutUser = async (id: string | undefined) => {
  const res = await api.delete(`api/auth/logout/${id}`);
  return res.data;
};

export const forgotPassword = async (data: ForgotPasswordDataType) => {
  const res = await api.post("/api/auth/forgot-password", data);
  return res.data;
};

interface IResetPasswordPayload {
  token: string;
  data: ResetPasswordDataType;
}

export const resetUserPassword = async ({
  data,
  token,
}: IResetPasswordPayload) => {
  const res = await api.post(`/api/auth/reset-password/${token}`, data);
  return res.data;
};

export const getUser = async (
  axiosPrivate: AxiosInstance,
  id: string | undefined
) => {
  const res = await axiosPrivate.get(`/api/users/${id}`);
  return res.data;
};

interface IDeleteUser {
  axiosPrivate: AxiosInstance;
  id: string | undefined;
}

export const deleteUserAccount = async ({ axiosPrivate, id }: IDeleteUser) => {
  const res = await axiosPrivate.delete(`/api/auth/accounts/${id}`);
  return res.data;
};
