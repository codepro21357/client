import { INewsletter } from "@/types";
import { AxiosInstance } from "axios";
import { api } from "../axios";

export const createNewsletter = async (data: { email: string }) => {
  const res = await api.post("/api/newsletters/", data);
  return res.data;
};

interface IGetAllNewslettersData {
  success: boolean;
  newsletters: INewsletter[];
}

export const getAllNewsletters = async (axiosPrivate: AxiosInstance) => {
  const res = await axiosPrivate.get("/api/newsletters/");
  return res.data as IGetAllNewslettersData;
};

interface IDeleteNewsletter {
  axiosPrivate: AxiosInstance;
  id: string;
}

export const deleteNewsletter = async ({
  axiosPrivate,
  id,
}: IDeleteNewsletter) => {
  const res = await axiosPrivate.delete(`/api/newsletters/${id}`);
  return res.data;
};
