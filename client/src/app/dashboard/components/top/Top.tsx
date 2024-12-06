"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "@/components/button/Button";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Sidebar from "../sidebar/Sidebar";
import Link from "next/link";
import DepositForm from "../depositForm/DepositForm";
import WithdrawalForm from "../withdrawalForm/WithdrawalForm";
import { IUser } from "@/types";

interface TopProps {
  user: null | IUser;
}

const Top = ({ user }: TopProps) => {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState("");

  const handleCoin = (type: string) => {
    setShowForm(type);
  };

  return (
    <div className="relative w-full p-8 shadow-lg bg-white overflow-x-clip">
      <DepositForm showForm={showForm} setShowForm={setShowForm} />
      <WithdrawalForm showForm={showForm} setShowForm={setShowForm} />
      <div className="flex justify-between gap-5">
        <Avatar className="w-[120px] h-[120px]">
          <AvatarImage
            src={user?.avatar ? user?.avatar?.url : "/assets/profile.png"}
            alt="Profile image"
            className="object-cover"
          />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="hidden xl:flex flex-col gap-8">
          <div className="flex gap-10">
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase text-primary-500">
                Equity
              </span>
              <b>${user?.equity}</b>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase text-primary-500">
                Balance
              </span>
              <b>${user?.balance}</b>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase text-primary-500">
                Open p&l
              </span>
              <b>${user?.openPl}</b>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase text-primary-500">
                Close p&l
              </span>
              <b>${user?.closePl}</b>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase text-primary-500">
                Free margin
              </span>
              <b>${user?.freeMargin}</b>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase text-primary-500">
                Margin (Level)
              </span>
              <b>${user?.marginLevel}</b>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase text-primary-500">
                Credit
              </span>
              <b>${user?.credit}</b>
            </div>
            <div
              className={`hidden xl:flex w-[50px] h-[50px] rounded-full z-40 items-center
              justify-center text-white cursor-pointer ${
                open ? "bg-black" : "bg-primary-400"
              }`}
              onClick={() => setOpen(!open)}
            >
              <HiOutlineMenuAlt3 size={25} />
            </div>
          </div>
          <div className="self-end flex items-center gap-5">
            <Link href="/dashboard/accounts">
              <Button type="accent" tight>
                Transactions
              </Button>
            </Link>
            <Button
              type="primary"
              tight
              handleClick={() => handleCoin("deposit")}
            >
              Deposit
            </Button>
            <Button
              type="secondary"
              tight
              handleClick={() => handleCoin("withdraw")}
            >
              Withdraw
            </Button>
          </div>
        </div>
        <div
          className={`xl:hidden w-[50px] h-[50px] rounded-full z-40 flex items-center
          justify-center text-white cursor-pointer bg-primary-400`}
          onClick={() => setOpen(true)}
        >
          <HiOutlineMenuAlt3 size={25} />
        </div>
        <Sidebar open={open} setOpen={setOpen} />
      </div>
      <div className="mt-2 flex justify-between flex-wrap gap-5">
        <h1 className="font-semibold text-xl text-primary-500">
          Welcome,{" "}
          {user && <span>{`${user.firstName} ${user.lastName}!`}</span>}
        </h1>
        <div className="xl:hidden flex items-center gap-2 text-xl">
          <span className="font-semibold uppercase text-primary-500">
            Balance:
          </span>
          <b>$0.00</b>
        </div>
      </div>
      <div className="mt-5 flex justify-between xl:hidden">
        <Button type="primary" tight handleClick={() => handleCoin("deposit")}>
          Deposit
        </Button>
        <Button
          type="secondary"
          tight
          handleClick={() => handleCoin("withdraw")}
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default Top;
