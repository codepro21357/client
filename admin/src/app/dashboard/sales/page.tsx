import SalesChart from "@/components/salesChart/SalesChart";
import React from "react";

const Sales = () => {
  return (
    <section className="w-full min-h-[calc(100vh-40px)] bg-white">
      <div className="px-5 py-7 flex flex-col gap-5">
        <h3 className="text-2xl font-bold">Sales Stats.</h3>
        <div>
          <SalesChart />
        </div>
      </div>
    </section>
  );
};

export default Sales;
