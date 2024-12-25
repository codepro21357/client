"use client";

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Top from "@/components/top/Top";
import { useAppSelector } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/users/api";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { Dialog } from "@/components/ui/dialog";
import DeleteAccount from "@/components/deleteAccount/DeleteAccount";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  const { mutate: logoutUserMutation, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      deleteCookie("id");
      router.push("/");
    },
  });

  useEffect(() => {
    const userId = getCookie("id");

    if (userId || user?.role !== "admin") {
      logoutUserMutation(userId);
    }
  }, [user]);

  if (getCookie("id")) return;

  return (
    <main className="w-full bg-gray-300">
      <Dialog>
        <DeleteAccount />
        <div
          className="container mx-auto relative flex items-stretch overflow-auto 
          md:overflow-x-hidden"
        >
          <Sidebar open={open} setOpen={setOpen} />
          <div className="w-full xl:w-[calc(100%-250px)]">
            <Top open={open} setOpen={setOpen} />
            {children}
          </div>
        </div>
      </Dialog>
    </main>
  );
};

export default DashboardLayout;
