"use client";

import React from "react";
import Container from "@/components/container/Container";
import { LuCircleDollarSign } from "react-icons/lu";
import { MdOutlineNumbers } from "react-icons/md";
import {
  AiOutlineExclamationCircle,
  AiOutlineFund,
  AiOutlineMoneyCollect,
  AiOutlineThunderbolt,
} from "react-icons/ai";
import { useAppSelector } from "@/hooks/redux";
import millify from "millify";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const CryptoDetails = ({ showChart }: { showChart: boolean }) => {
  const cryptoDetails = useAppSelector((state) => state.crypto?.cryptoDetails);

  if (!cryptoDetails) {
    return <></>;
  }

  return (
    <div
      className={`${
        showChart ? "" : "hidden sm:block"
      } py-10 shadow-lg bg-white`}
    >
      <Container>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1 md:flex-[3]">
            <h2 className="text-xl mb-2 font-semibold text-primary-500">
              {cryptoDetails?.name} Value Statistic
            </h2>
            <p className="text-primary-500">
              An overview showing the stats of {cryptoDetails?.name}
            </p>
            <div className="mt-6 flex flex-col gap-5">
              <div className="w-full md:max-w-[300px] flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-500">
                  <LuCircleDollarSign />
                  <span>Price in USD</span>
                </div>
                <span className="font-semibold">
                  ${millify(parseInt(cryptoDetails?.price))}
                </span>
              </div>
              <div className="w-full md:max-w-[300px] flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-500">
                  <MdOutlineNumbers />
                  <span>Rank</span>
                </div>
                <span className="font-semibold">{cryptoDetails?.rank}</span>
              </div>
              <div className="w-full md:max-w-[300px] flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-500">
                  <AiOutlineThunderbolt />
                  <span>24h Volume</span>
                </div>
                <span className="font-semibold">
                  ${millify(parseInt(cryptoDetails.dailyVolume))}
                </span>
              </div>
              <div className="w-full md:max-w-[300px] flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-500">
                  <LuCircleDollarSign />
                  <span>Market Cap</span>
                </div>
                <span className="font-semibold">
                  ${millify(parseInt(cryptoDetails?.marketCap))}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 md:flex-[2]">
            <h2 className="text-xl mb-2 font-semibold text-primary-500">
              Other Statistic
            </h2>
            <p className="text-primary-500">
              An overview showing the stats of all Cryptocurrencies
            </p>
            <div className="mt-6 flex flex-col gap-5">
              <div className="w-full md:max-w-[300px] flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-500">
                  <AiOutlineFund />
                  <span>Number Of Markets</span>
                </div>
                <span className="font-semibold">
                  <span>{cryptoDetails?.numberOfMarkets}</span>
                </span>
              </div>
              <div className="w-full md:max-w-[300px] flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-500">
                  <AiOutlineMoneyCollect />
                  <span>Market Of Exchanges</span>
                </div>
                <span className="font-semibold">
                  {cryptoDetails?.numberOfExchanges}
                </span>
              </div>
              <div className="w-full md:max-w-[300px] flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-500">
                  <AiOutlineExclamationCircle />
                  <span>Approved Supply</span>
                </div>
                {cryptoDetails?.supply.confirmed ? <FaCheck /> : <IoMdClose />}
              </div>
              <div className="w-full md:max-w-[300px] flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-500">
                  <AiOutlineExclamationCircle />
                  <span>Total Supply</span>
                </div>
                <span className="font-semibold">
                  ${millify(parseInt(cryptoDetails?.supply?.total))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CryptoDetails;
