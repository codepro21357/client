"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getSales } from "@/services/transactions/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ISales {
  month: string;
  sales: string;
  transactions: number;
}

const SalesChart = () => {
  const [sales, setSales] = useState<ISales[] | null>(null);
  const axiosPrivate = useAxiosPrivate();

  const { data, isFetching, error } = useQuery({
    queryFn: () => getSales(axiosPrivate),
    queryKey: ["sales"],
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    if (data) {
      const salesData: ISales[] = [];
      data?.data?.map(({ _id, total, transactions }) =>
        salesData.push({
          month: months[_id - 1],
          sales: `$${total}`,
          transactions,
        })
      );
      setSales(salesData);
    }
  }, [data]);

  if (isFetching && !data) {
    return <div className="w-full h-[400px] bg-gray-100 animate-pulse"></div>;
  }

  if (error) {
    return (
      <p className="text-error">
        Something went wrong, please refresh your browser!
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" aspect={4 / 2}>
      <AreaChart
        data={sales ? sales : []}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="transactions"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
