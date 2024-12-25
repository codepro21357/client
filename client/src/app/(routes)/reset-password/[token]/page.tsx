"use client";

import React from "react";
import Button from "@/components/button/Button";
import { ResetPasswordDataType, schema } from "../schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetUserPassword } from "@/services/users/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import { useParams } from "next/navigation";

const networkError =
  "getaddrinfo ENOTFOUND cluster0-shard-00-00.v33pl.mongodb.net";

const ResetPassword = () => {
  const params = useParams();
  const token = params.token as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordDataType>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: resetPasswordMutation, isPending } = useMutation({
    mutationFn: resetUserPassword,
    onSuccess: () => {
      reset();
      toast.success(
        "Your password has been reset. Kindly, visit the login page and sign in.",
        {
          duration: 5000,
        }
      );
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordDataType> = async (data) => {
    try {
      await resetPasswordMutation({ token, data });
    } catch (err: any) {
      let message = "Network error";

      if (err?.response) {
        if (err?.response?.data?.message.includes(networkError)) {
          message = "Network error, please check your internet connection";
        } else {
          message = "Sorry, reset password link has expired.";
        }
      }

      toast.error(message, {
        duration: 5000,
      });
    }
  };

  return (
    <main>
      <section className="w-full h-screen px-5 flex justify-center items-center">
        <div
          className="w-full max-w-[400px] mt-10 px-5 py-8 flex flex-col items-center 
            gap-8 bg-white shadow-xl"
        >
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="font-bold">New Password</label>
              <input
                type="text"
                placeholder="Enter your new password"
                className="px-4 py-2 border-2"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-error">{errors?.password?.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Confirm Password</label>
              <input
                type="text"
                placeholder="Enter password again"
                className="px-4 py-2 border-2"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-error">{errors?.confirmPassword?.message}</p>
              )}
            </div>
            <Button type="primary" width="full">
              {isPending ? <Loader indicator="Saving..." /> : "Reset"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
