"use client";

import React from "react";
import { logoutUser } from "@/services/users/api";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Loader from "@/components/loader/Loader";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { DialogTrigger } from "@/components/ui/dialog";
import { clearUser } from "@/redux/slice/userSlice";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user?.user);
  const dispatch = useAppDispatch();

  const { mutate: logoutUserMutation, isPending } = useMutation({
    mutationFn: () => logoutUser(user?._id),
    onSuccess: () => {
      dispatch(clearUser());
      router.push("/");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  if (isPending) {
    return <Loader cover />;
  }

  return (
    <nav
      className={`w-full flex justify-end fixed top-0 z-50 transition-all duration-300
      cursor-pointer ${open ? "right-0" : "-right-full"}`}
      onClick={() => setOpen(false)}
    >
      <div className="w-[80%] sm:w-[60%] xl:w-[250px] h-screen px-5 pt-8 flex flex-col gap-10 bg-gray-400">
        <div
          className={`self-end w-[50px] h-[50px] rounded-full flex items-center
          justify-center text-white cursor-pointer bg-black`}
          onClick={() => setOpen(false)}
        >
          <HiOutlineMenuAlt3 size={25} />
        </div>
        <ul className="flex flex-col gap-5">
          <li className="text-xl font-semibold text-white">
            <Link href="/">Home</Link>
          </li>
          <li className="text-xl font-semibold text-white">
            <Link href="/accounts">Accounts</Link>
          </li>
          <li className="text-xl font-semibold text-white">
            <Link href="/dashboard/accounts">Transactions</Link>
          </li>
          <li
            className="text-xl font-semibold text-white cursor-pointer"
            onClick={() => {
              setOpen(false);
              logoutUserMutation();
            }}
          >
            Logout
          </li>
          <li
            className="self-start px-5 py-2 text-xl font-semibold flex justify-center items-center
            rounded-full transition-all duration-300 text-white bg-red-500 hover:bg-red-400"
          >
            <DialogTrigger asChild>
              <span> Delete Account</span>
            </DialogTrigger>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
