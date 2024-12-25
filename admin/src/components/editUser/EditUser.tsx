"use client";

import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import { IUser } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { EditUserType, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "@/services/users/api";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Loader from "../loader/Loader";

interface EditUserProps {
  id: string;
  user: IUser;
}

const EditUser = ({ id, user }: EditUserProps) => {
  const [newUser, setNewUser] = useState<EditUserType | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditUserType>({
    resolver: zodResolver(schema),
    defaultValues: {
      balance: user.balance,
      equity: user.equity,
      openPl: user.openPl,
      closePl: user.closePl,
      freeMargin: user.freeMargin,
      marginLevel: user.marginLevel,
      credit: user.credit,
    },
  });

  const values = watch();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User info updated successfully!");
      setNewUser(null);
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<EditUserType> = (data) => {
    if (data.balance !== user.balance) {
      setNewUser(data);
      return;
    }
    if (data.equity !== user.equity) {
      setNewUser(data);
      return;
    }
    if (data.openPl !== user.openPl) {
      setNewUser(data);
      return;
    }
    if (data.closePl !== user.closePl) {
      setNewUser(data);
      return;
    }
    if (data.freeMargin !== user.freeMargin) {
      setNewUser(data);
      return;
    }
    if (data.marginLevel !== user.marginLevel) {
      setNewUser(data);
      return;
    }
    if (data.credit !== user.credit) {
      setNewUser(data);
      return;
    }
  };

  useEffect(() => {
    if (newUser) {
      updateUserMutation({ axiosPrivate, id, data: newUser });
    }
  }, [newUser]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 flex flex-col gap-5 rounded-lg bg-white shadow-lg"
    >
      <h3 className="text-2xl font-bold">Edit User</h3>
      <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-5">
        <div className="w-full sm:w-[calc(calc(100%-20px)/2)] flex flex-col gap-2">
          <label className="font-bold">Balance:</label>
          <input
            type="text"
            value={values.balance}
            {...register("balance")}
            className="p-2 border-2 border-solid"
          />
          {errors.balance && (
            <p className="text-error">{errors?.balance?.message}</p>
          )}
        </div>
        <div className="w-full sm:w-[calc(calc(100%-20px)/2)] flex flex-col gap-2">
          <label className="font-bold">Equity:</label>
          <input
            type="text"
            value={values.equity}
            {...register("equity")}
            className="p-2 border-2 border-solid"
          />
          {errors.equity && (
            <p className="text-error">{errors?.equity?.message}</p>
          )}
        </div>
        <div className="w-full sm:w-[calc(calc(100%-20px)/2)] flex flex-col gap-2">
          <label className="font-bold">Open PL:</label>
          <input
            type="text"
            value={values.openPl}
            {...register("openPl")}
            className="p-2 border-2 border-solid"
          />
          {errors.openPl && (
            <p className="text-error">{errors?.openPl?.message}</p>
          )}
        </div>
        <div className="w-full sm:w-[calc(calc(100%-20px)/2)] flex flex-col gap-2">
          <label className="font-bold">Close PL:</label>
          <input
            type="text"
            value={values.closePl}
            {...register("closePl")}
            className="p-2 border-2 border-solid"
          />
          {errors.closePl && (
            <p className="text-error">{errors?.closePl?.message}</p>
          )}
        </div>
        <div className="w-full sm:w-[calc(calc(100%-20px)/2)] flex flex-col gap-2">
          <label className="font-bold">Free Margin:</label>
          <input
            type="text"
            value={values.freeMargin}
            {...register("freeMargin")}
            className="p-2 border-2 border-solid"
          />
          {errors.freeMargin && (
            <p className="text-error">{errors?.freeMargin?.message}</p>
          )}
        </div>
        <div className="w-full sm:w-[calc(calc(100%-20px)/2)] flex flex-col gap-2">
          <label className="font-bold">Margin Level:</label>
          <input
            type="text"
            value={values.marginLevel}
            {...register("marginLevel")}
            className="p-2 border-2 border-solid"
          />
          {errors.marginLevel && (
            <p className="text-error">{errors?.marginLevel?.message}</p>
          )}
        </div>
        <div className="w-full sm:w-[calc(calc(100%-20px)/2)] flex flex-col gap-2">
          <label className="font-bold">Credit:</label>
          <input
            type="text"
            value={values.credit}
            {...register("credit")}
            className="p-2 border-2 border-solid"
          />
          {errors.credit && (
            <p className="text-error">{errors?.credit?.message}</p>
          )}
        </div>
      </div>
      <div>
        <Button type="primary" disabled={isPending}>
          {isPending ? <Loader indicator="Saving..." /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default EditUser;
