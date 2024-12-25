import { LoginDataType } from "@/app/schema";
import { EditUserType } from "@/components/editUser/schema";
import { IGetUserStats, IOverview, IUser } from "@/types";
import { AxiosInstance } from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { api } from "../axios";

export const loginUser = async (data: LoginDataType) => {
  const res = await api.post("/api/auth/login", data);

  if (res.data?.user?.role !== "admin") {
    setCookie("id", res.data?.user?._id);
    await api.delete(`api/auth/logout/${res.data?.user?._id}`);
    deleteCookie("id");
    throw new Error("You're not authorized");
  }

  return res.data;
};

export const logoutUser = async (id: string | undefined) => {
  const res = await api.delete(`/api/auth/logout/${id}`);
  return res.data;
};

interface IGetUser {
  success: boolean;
  user: IUser;
}

export const getUser = async (
  axiosPrivate: AxiosInstance,
  id: string | undefined
) => {
  const res = await axiosPrivate.get(`/api/users/${id}`);
  return res.data as IGetUser;
};

interface IGetAllUsers {
  success: boolean;
  users: IUser[];
}

export const getAllUsers = async (axiosPrivate: AxiosInstance) => {
  const res = await axiosPrivate.get("/api/users");
  return res.data as IGetAllUsers;
};

interface IUpdateUser {
  id: string;
  data: EditUserType;
  axiosPrivate: AxiosInstance;
}

export const updateUser = async ({ axiosPrivate, id, data }: IUpdateUser) => {
  const res = await axiosPrivate.put(`/api/users/${id}`, data);
  return res.data;
};

interface IDeleteUser {
  axiosPrivate: AxiosInstance;
  id: string | undefined;
}

export const deleteUser = async ({ axiosPrivate, id }: IDeleteUser) => {
  const res = await axiosPrivate.delete(`/api/users/${id}`);
  return res.data;
};

export const deleteUserAccount = async ({ axiosPrivate, id }: IDeleteUser) => {
  const res = await axiosPrivate.delete(`/api/auth/accounts/${id}`);
  return res.data;
};

export const getUserStats = async (axiosPrivate: AxiosInstance) => {
  const res = await axiosPrivate.get("/api/users/stats");
  return res.data as IGetUserStats;
};

interface IGetOverview {
  success: boolean;
  overview: IOverview[];
}

export const getOverview = async (axiosPrivate: AxiosInstance) => {
  const res = await axiosPrivate.get("/api/overview/");
  return res.data as IGetOverview;
};
