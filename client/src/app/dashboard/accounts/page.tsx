import React from "react";
import AccountsTop from "../components/accountsTop/AccountsTop";
import Activities from "../components/activities/Activities";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const Accounts = () => {
  return (
    <main>
      <div className="w-full flex justify-center bg-gray-50">
        <div className="w-full min-h-screen max-w-[950px] pb-10 bg-white shadow-md">
          <div className="p-5 flex items-center gap-2 cursor-pointer underline">
            <MdOutlineKeyboardArrowLeft size={25} />
            <Link href="/dashboard" className="font-bold">
              Back
            </Link>
          </div>
          <AccountsTop />
          <Activities />
        </div>
      </div>
    </main>
  );
};

export default Accounts;
