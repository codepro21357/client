"use client";

import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IoWarningOutline } from "react-icons/io5";
import Button from "../button/Button";
import { DotSpinner } from "@uiball/loaders";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteUserAccount } from "@/services/users/api";
import { deleteUserId } from "@/redux/slice/userSlice";

const DeleteAccount = () => {
  const { userId } = useAppSelector((state) => state.user);
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  const { mutate: deleteUserMutation, isPending } = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      dispatch(deleteUserId());
      router.push("/");
    },
    onError: () => {
      toast.error(
        "Something went wrong while deleting your account, please refresh your browser!"
      );
    },
  });

  const handleClick = () => {
    deleteUserMutation({ axiosPrivate, id: userId });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      {isPending ? (
        <DeleteLoader />
      ) : (
        <div className="py-5 flex flex-col gap-10">
          <div className="flex gap-3">
            <IoWarningOutline size={25} className="text-red-400" />
            <div>
              <DialogHeader>
                <DialogTitle className="font-bold">Delete User</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-sm text-gray-500">
                Are you sure you want to delete your account?
              </DialogDescription>
            </div>
          </div>
          <div className="self-end">
            <Button type="danger" handleClick={handleClick} tight>
              Delete
            </Button>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

const DeleteLoader = () => {
  return (
    <div className="pt-[100px] pb-10 flex justify-center">
      <DotSpinner size={30} speed={0.9} color="orange" />
      <div
        className="px-5 py-5 absolute top-0
        right-0 left-0 z-50 text-white bg-orange-400"
      >
        <DialogTitle>
          Deleting your account, please don't close the browser...
        </DialogTitle>
      </div>
    </div>
  );
};

export default DeleteAccount;
