"use client";

import React from "react";
import Button from "@/components/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDataType, schema } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/users/api";
import { useAppDispatch } from "@/hooks/redux";
import { addUser } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const networkError =
    "getaddrinfo ENOTFOUND cluster0-shard-00-00.v33pl.mongodb.net";

  const { mutateAsync: loginUserMutation, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      dispatch(addUser(user));
      router.push("/dashboard");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginDataType> = async (data) => {
    try {
      await loginUserMutation(data);
    } catch (err: any) {
      let message = "Something went wrong, please try again!";

      if (err instanceof Error) {
        message = err.message;
      }

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
    <main
      className="w-full h-screen px-5 py-[80px] flex justify-center 
       items-center md:items-start bg-gray-100"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] flex justify-center flex-col border-2 bg-white 
        shadow-md p-[25px] rounded-md mt-[90px]"
      >
        <h1 className="text-center text-[20px]">Welcome back! (Admin)</h1>
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="E-mail"
              {...register("email")}
              className="w-full p-[10px] border rounded-md border-gray-300"
            />
            {errors.email && (
              <p className="text-error">{errors?.email?.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-[10px] border rounded-md border-gray-300"
            />
            {errors.password && (
              <p className="text-error">{errors?.password?.message}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label className="text-gray-500">Remember me</label>
          </div>
          <div className="text-white font-bold">
            <Button type="gradient" width="full" disabled={isPending === true}>
              {isPending ? <Loader /> : "Login to account"}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Login;
