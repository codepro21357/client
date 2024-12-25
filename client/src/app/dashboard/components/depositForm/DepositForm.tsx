"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCloudArrowUp } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaImage } from "react-icons/fa";
import Button from "@/components/button/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { DepositDataType, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTransaction } from "@/services/transactions/api";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Loader from "@/components/loader/Loader";
import { useAppSelector } from "@/hooks/redux";
import CopyText from "../copyText/CopyText";

const networkError =
  "getaddrinfo ENOTFOUND cluster0-shard-00-00.v33pl.mongodb.net";
const toastSuccess =
  "Deposit confirmation sent successful, kindly check transaction page for more info. Thanks!";

interface DepositFormProps {
  showForm: string;
  setShowForm: (value: string) => void;
}

const DepositForm = ({ showForm, setShowForm }: DepositFormProps) => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [fileError, setFileError] = useState("");
  const user = useAppSelector((state) => state.user?.user);
  const axiosPrivate = useAxiosPrivate();

  const {
    control,
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DepositDataType>({
    defaultValues: { coinType: "bitcoin" },
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createTransactionMutation, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      reset();
      setFile("");
      setImage("");
      setShowForm("");
      toast.success(toastSuccess);
    },
  });

  const values = watch();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileDetails = e.target.files[0];
      const url = URL.createObjectURL(fileDetails);
      setImage(url);
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setFile(base64String);
      };
      reader.readAsDataURL(fileDetails);
      setFileError("");
    }
  };

  const onSubmit: SubmitHandler<DepositDataType> = async (data) => {
    if (!file) {
      return setFileError("Payment screenshot is required!");
    }

    if (!user) return;

    try {
      const formValues = {
        ...data,
        paymentScreenshot: file,
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

  useEffect(() => {
    if (Object.keys(errors).length > 0 && !file) {
      setFileError("Payment screenshot is required!");
    }
  }, [errors, file]);

  return (
    <div
      className={`w-full h-screen px-5 py-20 md:py-10 flex justify-center 
        md:items-center fixed top-0 right-0 z-50 bg-gray-500/40 origin-top 
        transition-all duration-300 overflow-y-auto
        ${showForm === "deposit" ? "scale-y-100" : "scale-y-0"}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[600px] h-fit rounded-3xl overflow-hidden
        flex flex-col-reverse md:flex-row bg-[#f5f5f5] shadow-lg"
      >
        <div className="md:flex-1 px-5 py-8">
          <h1 className="text-2xl font-bold text-center">
            Confirm Coin Deposit
          </h1>
          <div className="mt-5 flex flex-col gap-5">
            <Controller
              name="coinType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bitcoin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bitcoin">Bitcoin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Amount (0.0124btc)"
                {...register("amount")}
                className="p-2 border-[1px] border-solid bg-transparent shadow-sm"
              />
              {errors.amount && (
                <p className="text-sm text-error">{errors?.amount?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Total (USD)"
                {...register("total")}
                className="p-2 border-[1px] border-solid bg-transparent shadow-sm"
              />
              {errors.total && (
                <p className="text-sm text-error">{errors?.total?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="file"
                className="flex items-center gap-2 text-primary-400 cursor-pointer"
              >
                <FaCloudArrowUp size={30} />
                <span>Upload Payment Screenshot</span>
              </label>
              <input
                id="file"
                type="file"
                onChange={handleFile}
                className="hidden"
              />
              {fileError && <p className="text-sm text-error">{fileError}</p>}
            </div>
            <div>
              {image ? (
                <div className="relative w-[100px] h-[100px]">
                  <Image
                    fill
                    src={image}
                    alt="Payment screenshot"
                    className="object-cover"
                  />
                </div>
              ) : (
                <FaImage size={100} className="mt-[-20px]" />
              )}
            </div>
          </div>
          <div className="mt-8">
            <Button
              type="primary"
              width="full"
              rounded
              disabled={isPending === true}
            >
              {isPending ? (
                <Loader indicator="Sending..." />
              ) : (
                "Confirm Deposit"
              )}
            </Button>
          </div>
        </div>
        <div
          className="relative md:flex-1 p-5 flex flex-col justify-center 
          items-center gap-5 text-white bg-account-card"
        >
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setShowForm("")}
          >
            <IoMdClose size={25} />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <b>
              <span className="capitalize">{values.coinType}</span> QR Code
            </b>
            <div className="w-[120px] h-[120px] relative">
              <Image fill src="/assets/btcWallet.jpg" alt="Crypto image" />
            </div>
          </div>
          <CopyText text="bc1q9xqmq0mfkuxs3fgfaj7el4exprwdzufu03wr77" />
        </div>
      </form>
    </div>
  );
};

export default DepositForm;
