"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import SkeletonCard from "../skeletonCard/SkeletonCard";
import { getCoinHistory, getSingleCoinDetails } from "@/services/crypto/api";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/redux";
import { addCryptoDetails } from "@/redux/slice/cryptoSlice";
import { MdArrowBack } from "react-icons/md";

interface CryptoChartProps {
  coinId: string;
  showChart: boolean;
  setShowChart: (value: boolean) => void;
}

const CryptoChart = ({ coinId, showChart, setShowChart }: CryptoChartProps) => {
  const [timePeriod, setTimePeriod] = useState("5y");
  const dispatch = useAppDispatch();

  const { data: coinDetails, isLoading } = useQuery({
    queryFn: () => getSingleCoinDetails(coinId),
    queryKey: ["singleCoinDetails", coinId],
  });

  const { data: coinHistory } = useQuery({
    queryFn: () => getCoinHistory(coinId, timePeriod),
    queryKey: ["coinHistory", coinId, timePeriod],
  });

  const coinPrice: number[] = [];
  const coinTimestamp: string[] = [];
  const time = ["3m", "3h", "24h", "7d", "30d", "1y", "3y", "5y"];

  useEffect(() => {
    if (coinDetails) {
      dispatch(addCryptoDetails(coinDetails));
    }
  }, [coinDetails]);

  if (isLoading) {
    return <SkeletonCard />;
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#e75151",
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        display: true,
        beginAtZero: true,
      },
    },
  };

  Chart.register(...registerables);

  return (
    <div
      className={`${
        showChart ? "" : "hidden sm:block"
      } flex-1 xxl:flex-[3] px-5 py-5 shadow-lg bg-white overflow-y-auto`}
    >
      <div
        className="sm:hidden cursor-pointer"
        onClick={() => setShowChart(false)}
      >
        <MdArrowBack size={25} />
      </div>
      <div className="mt-5 mb-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          {coinDetails && (
            <div>
              <Image
                width={20}
                height={20}
                src={coinDetails?.iconUrl}
                alt={coinDetails.name}
              />
            </div>
          )}
          <strong>{coinDetails?.name} / U.S. Dollar</strong>
        </div>
        <Select onValueChange={(value) => setTimePeriod(value)}>
          <SelectTrigger className="w-[60px] sm:w-[180px]">
            <SelectValue placeholder={timePeriod} />
          </SelectTrigger>
          <SelectContent>
            {time.map((t) => (
              <SelectItem value={t} key={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default CryptoChart;
