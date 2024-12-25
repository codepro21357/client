import { ITransaction } from "@/types";
import { AxiosInstance } from "axios";

interface ICreateTransaction {
  id: string;
  axiosPrivate: AxiosInstance;
  data: {
    paymentScreenshot?: string;
    coinType?: string;
    amount: string;
    total: string;
  };
}

export const createTransaction = async ({
  id,
  axiosPrivate,
  data,
}: ICreateTransaction) => {
  const res = await axiosPrivate.post(`/api/transactions/${id}`, data);
  return res.data;
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
