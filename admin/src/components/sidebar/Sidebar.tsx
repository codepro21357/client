"use client";

import React from "react";
import Link from "next/link";
import { SiKucoin } from "react-icons/si";
import { IoChatbubbles, IoSpeedometer } from "react-icons/io5";
import { TbBusinessplan } from "react-icons/tb";
import { MdAttachMoney, MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { CiLogout } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/services/users/api";
import toast from "react-hot-toast";
import { useAppSelector } from "@/hooks/redux";
import Loader from "../loader/Loader";

import { DialogTrigger } from "@/components/ui/dialog";

const linkStyle =
  "flex gap-3 items-center px-2 font-semibold text-[12px] text-white hover:text-white/60";
const linkContainerStyle = "py-3 ";
const networkError =
  "getaddrinfo ENOTFOUND cluster0-shard-00-00.v33pl.mongodb.net";

interface SidebarProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { userId } = useAppSelector((state) => state.user);
  const router = useRouter();

  const { mutateAsync: logoutUserMutation, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleLogout = async () => {
    try {
      await logoutUserMutation(userId);
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
    <>
      {isPending && <Loader cover />}
      <nav
        className={`${open ? "left-0" : "left-[-100%]"} 
      w-[250px] xl:block absolute xl:static top-0 bottom-0 z-20 transition-all 
      duration-700 ease-in-out text-white bg-accent-300`}
      >
        <div
          className={`${
            open ? "pl-4" : ""
          } h-[40px] flex justify-center items-center gap-2 bg-gray-700`}
        >
          <span>
            <SiKucoin size={15} />
          </span>
          <span>Reinholders</span>
        </div>
        <div className="px-5 py-7 flex flex-col gap-5">
          <div>
            <h1 className="font-bold uppercase text-bitcoin">Main</h1>
            <ul>
              <li
                className={`${pathname === "/dashboard" ? "bg-orange-500" : ""} 
              ${linkContainerStyle} rounded-lg`}
                onClick={() => setOpen(false)}
              >
                <Link href="/dashboard" className={linkStyle}>
                  <IoSpeedometer size={15} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li
                className={`${
                  pathname === "/dashboard/transactions" ? "bg-orange-500" : ""
                } 
              ${linkContainerStyle} rounded-lg`}
                onClick={() => setOpen(false)}
              >
                <Link href="/dashboard/transactions" className={linkStyle}>
                  <TbBusinessplan size={15} />
                  <span>Transactions</span>
                </Link>
              </li>
              <li
                className={`${
                  pathname === "/dashboard/sales" ? "bg-orange-500" : ""
                } 
              ${linkContainerStyle} rounded-lg`}
                onClick={() => setOpen(false)}
              >
                <Link href="/dashboard/sales" className={linkStyle}>
                  <MdAttachMoney size={15} />
                  <span>Sales</span>
                </Link>
              </li>
              <li
                className={`${
                  pathname === "/dashboard/users" ? "bg-orange-500" : ""
                } 
              ${linkContainerStyle} rounded-lg`}
                onClick={() => setOpen(false)}
              >
                <Link href="/dashboard/users" className={linkStyle}>
                  <FaUsers size={15} />
                  <span>Users</span>
                </Link>
              </li>
              <li
                className={`${
                  pathname === "/dashboard/chats" ? "bg-orange-500" : ""
                } 
              ${linkContainerStyle} rounded-lg`}
                onClick={() => setOpen(false)}
              >
                <Link href="/dashboard/chats" className={linkStyle}>
                  <IoChatbubbles size={15} />
                  <span>Chats</span>
                </Link>
              </li>
              <li
                className={`${
                  pathname === "/dashboard/newsletters" ? "bg-orange-500" : ""
                } 
              ${linkContainerStyle} rounded-lg`}
                onClick={() => setOpen(false)}
              >
                <Link href="/dashboard/newsletters" className={linkStyle}>
                  <MdOutlineMarkEmailUnread size={15} />
                  <span>Newsletters</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold uppercase text-bitcoin">Authentication</h1>
            <ul className="mt-3 flex flex-col gap-3">
              <li
                className={`${linkStyle} cursor-pointer`}
                onClick={handleLogout}
              >
                <CiLogout size={15} />
                <span>Log Out</span>
              </li>
              <li className={`${linkStyle} cursor-pointer`}>
                <TiUserDelete size={15} />
                <DialogTrigger asChild>
                  <span>Delete Account</span>
                </DialogTrigger>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
