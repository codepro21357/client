import { ITransaction } from "@/types";
import { AxiosInstance } from "axios";

interface IGetSales {
  success: boolean;
  data: {
    _id: number;
    total: number;
    transactions: number;
  }[];
}

export const getSales = async (axiosPrivate: AxiosInstance) => {
  const res = await axiosPrivate.get("/api/overview/sales");
  return res.data as IGetSales;
};

interface IGetTransaction {
  success: boolean;
  transaction: ITransaction;
}

export const getTransaction = async (
  axiosPrivate: AxiosInstance,
  id: string | undefined
) => {
  const res = await axiosPrivate.get(`/api/transactions/details/${id}`);
  return res.data as IGetTransaction;
};

interface ITransactionsData {
  success: boolean;
  transactions: ITransaction[];
}

export const getUserTransactions = async (
  axiosPrivate: AxiosInstance,
  id: string | undefined
) => {
  const res = await axiosPrivate.get(`/api/transactions/${id}`);
  return res.data as ITransactionsData;
};

export const getAllTransactions = async (axiosPrivate: AxiosInstance) => {
  const res = await axiosPrivate.get("/api/transactions/");
  return res.data as ITransactionsData;
};

interface IUpdateTransaction {
  id: string;
  data: { status: string };
  axiosPrivate: AxiosInstance;
}

export const updateTransaction = async ({
  axiosPrivate,
  id,
  data,
}: IUpdateTransaction) => {
  const res = await axiosPrivate.put(`/api/transactions/${id}`, data);
  return res.data;
};

interface IDeleteTransaction {
  id: string;
  axiosPrivate: AxiosInstance;
}

export const deleteTransaction = async ({
  axiosPrivate,
  id,
}: IDeleteTransaction) => {
  const res = await axiosPrivate.delete(`/api/transactions/${id}`);
  return res.data;
};
