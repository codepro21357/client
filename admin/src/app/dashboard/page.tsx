import React from "react";
import Overview from "@/components/overview/Overview";
import UserList from "@/components/userList/UserList";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/chart/Chart"), {
  ssr: false,
});

const Dashboard = () => {
  return (
    <section className="w-full min-h-screen bg-gray-400">
      <div className="px-5 py-7 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Overview</h3>
        </div>
        <Overview />
        <div className="mt-5 flex flex-col lg:flex-row gap-5">
          <UserList />
          <div
            className="w-full lg:w-[calc(60%-20px)] min-h-[300px] px-5 py-5
           bg-white shadow-lg"
          >
            <h3 className="text-xl ml-5 mb-5 font-bold">Users stats.</h3>
            <Chart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
