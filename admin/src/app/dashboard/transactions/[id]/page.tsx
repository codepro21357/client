"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/button/Button";
import TransactionSkeleton from "@/components/transactionSkeleton/TransactionSkeleton";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getTransaction, updateTransaction } from "@/services/transactions/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTransactionType, schema } from "./schema";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";

const Transaction = () => {
  const params = useParams();
  const id = params.id as string;
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { data, isFetching, error } = useQuery({
    queryFn: () => getTransaction(axiosPrivate, id),
    queryKey: ["transaction", id],
  });

  const { mutate: updateStatusMutation, isPending } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      toast.success("Status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["transaction", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { control, handleSubmit } = useForm<EditTransactionType>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: data?.transaction.status,
    },
  });

  const onSubmit: SubmitHandler<EditTransactionType> = (transactionData) => {
    if (transactionData.status !== data?.transaction?.status) {
      updateStatusMutation({ axiosPrivate, id, data: transactionData });
    }
  };

  if (isFetching && !data) {
    return <TransactionSkeleton />;
  }

  return (
    <section className="w-full min-h-[calc(100vh-40px)] bg-white">
      {error && (
        <div className="px-5 py-7">
          <p className="text-error">
            Something went wrong, please refresh your browser!
          </p>
        </div>
      )}
      <div className="px-5 pt-7 pb-28 flex flex-col gap-7">
        <h1 className="text-2xl font-bold capitalize">
          {data ? data?.transaction?.user?.name : "User"} transaction
        </h1>
        <div className="flex flex-col sm:flex-row gap-10">
          <div>
            <ul className="flex flex-col gap-5 capitalize">
              <li>
                <b>User ID:</b>{" "}
                {data && <span>{data?.transaction?.user?.userId}</span>}
              </li>
              <li>
                <b>Transaction ID:</b>{" "}
                {data && <span>{data?.transaction?._id}</span>}
              </li>
              <li>
                <b>Amount:</b>
                {data && <span>{data?.transaction?.amount}</span>}
              </li>
              <li>
                <b>Total:</b>$ {data && <span>{data?.transaction?.total}</span>}
              </li>
              {data?.transaction?.walletAddress && (
                <li>
                  <b>Wallet Address:</b>{" "}
                  {data && <span>{data?.transaction?.walletAddress}</span>}
                </li>
              )}
              <li>
                <b>Transaction Type:</b>{" "}
                {data && <span>{data?.transaction?.transactionType}</span>}
              </li>
              <li>
                <b>Status:</b>{" "}
                {data && <span>{data?.transaction?.status}</span>}
              </li>
              <li>
                <b>Transaction Date:</b>{" "}
                {data && (
                  <span>
                    {moment(data?.transaction?.createdAt).format(
                      "MMMM Do, YYYY h:mm A"
                    )}
                  </span>
                )}
              </li>
            </ul>
          </div>
          {data?.transaction?.paymentScreenshot?.url && (
            <div className="flex-1 flex flex-col gap-5">
              <h2 className="text-xl font-bold">Payment Screenshot</h2>
              <div className="h-[300px] md:flex-1 relative">
                <Image
                  fill
                  src={data?.transaction?.paymentScreenshot?.url}
                  alt="Payment Screenshot"
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <h3 className="text-xl font-bold">Edit Transaction</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-5"
          >
            <div className="flex items-center gap-2">
              <label className="font-bold">Status</label>
              <div className="w-[200px]">
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={data?.transaction.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="successful"
                          disabled={data?.transaction.status === "successful"}
                        >
                          Successful
                        </SelectItem>
                        <SelectItem
                          value="failed"
                          disabled={data?.transaction.status === "failed"}
                        >
                          Failed
                        </SelectItem>
                        <SelectItem
                          value="pending"
                          disabled={data?.transaction.status === "pending"}
                        >
                          Pending
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <Button type="primary" disabled={isPending}>
              {isPending ? <Loader indicator="Saving..." /> : "Save"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Transaction;
