"use client";

import React from "react";
import Button from "@/components/button/Button";
import { ForgotPasswordDataType, schema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "@/services/users/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";

const networkError =
  "getaddrinfo ENOTFOUND cluster0-shard-00-00.v33pl.mongodb.net";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordDataType>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: forgotPasswordMutation, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      reset();
      toast.success("Password reset link has been sent to your email", {
        duration: 5000,
      });
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordDataType> = async (data) => {
    try {
      await forgotPasswordMutation(data);
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
    <main>
      <section className="w-full h-screen px-5 flex justify-center items-center">
        <div
          className="w-full max-w-[400px] mt-10 px-5 py-8 flex flex-col items-center 
            gap-8 bg-white shadow-xl"
        >
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="font-bold">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                className="px-4 py-2 border-2"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-error">{errors?.email?.message}</p>
              )}
            </div>
            <Button type="primary" width="full">
              {isPending ? <Loader indicator="Sending..." /> : "Send"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
