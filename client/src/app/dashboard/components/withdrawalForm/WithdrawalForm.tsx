"use client";

import Button from "@/components/button/Button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { schema, WithdrawDataType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "@/services/transactions/api";
import toast from "react-hot-toast";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAppSelector } from "@/hooks/redux";
import Loader from "@/components/loader/Loader";

const networkError =
  "getaddrinfo ENOTFOUND cluster0-shard-00-00.v33pl.mongodb.net";
const toastSuccess =
  "Transaction in progress, kindly check transaction page for more info. Thanks!";

interface WithdrawalFormProps {
  showForm: string;
  setShowForm: (value: string) => void;
}

const WithdrawalForm = ({ showForm, setShowForm }: WithdrawalFormProps) => {
  const axiosPrivate = useAxiosPrivate();
  const user = useAppSelector((state) => state.user?.user);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawDataType>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createTransactionMutation, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      reset();
      setShowForm("");
      toast.success(toastSuccess);
    },
  });

  const onSubmit: SubmitHandler<WithdrawDataType> = async (data) => {
    if (!user) return;

    const balance = user?.balance;

    if (data.amount > balance || data.amount <= "0") {
      return toast.error("Insufficient funds!");
    }

    try {
      const formValues = {
        ...data,
        total: data.amount,
        user: {
          userId: user?._id,
          name: `${user?.firstName} ${user?.lastName}`,
        },
      };

      await createTransactionMutation({
        id: user._id,
        axiosPrivate,
        data: formValues,
      });
    } catch (err: any) {
      let message = "Network error";

      if (err?.response) {
        if (err?.response?.data?.message.includes(networkError)) {
          message = "Network error, please check your internet connection";
        } else {
          message = err?.response?.data?.message;
        }
      }

      toast.error(message);
    }
  };

  return (
    <div
      className={`w-full h-screen px-5 flex justify-center items-center fixed top-0 
        right-0 z-50 bg-gray-500/40 origin-top transition-all duration-300 overflow-y-auto
        ${showForm === "withdraw" ? "scale-y-100" : "scale-y-0"}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full max-w-[400px] px-5 py-8 rounded-3xl 
        flex flex-col gap-5 bg-[#f5f5f5] shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center">Withdraw Coin</h1>
        <div className="text-xl font-semibold flex gap-2">
          <span>Balance:</span>
          <span>${user?.balance}</span>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Amount"
            {...register("amount")}
            className="p-2 border-[1px] border-solid bg-transparent shadow-sm"
          />
          {errors.amount && (
            <p className="text-sm text-error">{errors?.amount?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Wallet Address"
            {...register("walletAddress")}
            className="p-2 border-[1px] border-solid bg-transparent shadow-sm"
          />
          {errors.walletAddress && (
            <p className="text-sm text-error">
              {errors?.walletAddress?.message}
            </p>
          )}
        </div>
        <div className="text-white">
          <Button type="gradient" width="full" rounded>
            {isPending ? <Loader indicator="Sending..." /> : "Withdraw"}
          </Button>
        </div>
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setShowForm("")}
        >
          <IoMdClose size={25} />
        </div>
      </form>
    </div>
  );
};

export default WithdrawalForm;
