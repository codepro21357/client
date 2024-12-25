"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAppSelector } from "@/hooks/redux";

const AccountsTop = () => {
  const [mounted, setMounted] = useState(false);
  const user = useAppSelector((state) => state.user?.user);

  const accounts = [
    {
      id: 1,
      title: "Balance",
      value: mounted ? user?.balance : "...",
    },
    {
      id: 2,
      title: "My Bitcoin Wallet",
      img: "/assets/btcWallet.jpg",
    },
    {
      id: 3,
      title: "Equity",
      value: mounted ? user?.equity : "...",
    },
    {
      id: 4,
      title: "Open p&l",
      value: mounted ? user?.openPl : "...",
    },
    {
      id: 5,
      title: "Close p&l",
      value: mounted ? user?.closePl : "...",
    },
    {
      id: 6,
      title: "Free margin",
      value: mounted ? user?.freeMargin : "...",
    },
    {
      id: 7,
      title: "Margin (Level)",
      value: mounted ? user?.marginLevel : "...",
    },
    {
      id: 8,
      title: "Credit",
      value: mounted ? user?.credit : "...",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="px-5 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center text-gray-700">
        My Account
      </h1>
      <div className="relative">
        <Swiper
          loop
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination-1",
            type: "bullets",
          }}
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            460: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {accounts.map((acc) => (
            <SwiperSlide key={acc.id}>
              <div className="flex flex-col gap-5">
                <h4
                  className="relative text-xl font-bold text-primary-400 before:content-['']
            before:w-[20px] before:h-[4px] before:absolute before:bottom-[-5px] before:left-0
            before:bg-primary-400"
                >
                  {acc.title}
                </h4>
                {acc.img ? (
                  <div className="py-3 flex justify-center items-center rounded-md bg-account-card">
                    <div className="w-full h-[80px] relative">
                      <Image
                        fill
                        src={acc.img}
                        alt="Wallet image"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-[104px] flex justify-center items-center rounded-md bg-account-card">
                    <span className="text-3xl font-bold text-white">
                      ${acc.value}
                    </span>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="button-swiper top-[30px!important]">
          <div className="swiper-button-prev after:text-primary-500"></div>
          <div className="swiper-button-next after:text-primary-500"></div>
        </div>
        <div className="pagination-wrapper-1">
          <div className="swiper-pagination-1"></div>
        </div>
      </div>
    </div>
  );
};

export default AccountsTop;
