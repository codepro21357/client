"use client";

import { useAppDispatch } from "@/hooks/redux";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getUserStats } from "@/services/users/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "../ui/skeleton";

interface IUserStats {
  month: string;
  "Active User": number;
}

const Chart = () => {
  const [stats, setStats] = useState<IUserStats[] | Array<any>>([]);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();

  const {
    data: userStats,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getUserStats(axiosPrivate),
    queryKey: ["userStats"],
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
    if (userStats) {
      const newData: IUserStats[] = [];
      userStats?.data?.map(({ _id, total }) =>
        newData.push({ month: months[_id - 1], "Active User": total })
      );
      setStats(newData);
    }
  }, [userStats]);

  if (isFetching) {
    return <Skeleton className="w-full h-[70%]" />;
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
      <LineChart data={stats}>
        <Line type="monotone" dataKey="Active User" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
