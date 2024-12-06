"use client";

import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getOverview } from "@/services/users/api";
import { IOverview } from "@/types";

const Overview = () => {
  const dummyOverviews = [
    {
      id: 1,
      title: "Sales",
      value: "...",
    },
    {
      id: 2,
      title: "Bitcoin",
      value: "...",
    },
    {
      id: 3,
      title: "Transactions",
      value: "...",
    },
    {
      id: 4,
      title: "Users",
      value: "...",
    },
    {
      id: 5,
      title: "Newsletter",
      value: "...",
    },
  ];
  const [overviews, setOverviews] = useState<IOverview[]>(dummyOverviews);

  const axiosPrivate = useAxiosPrivate();

  const { data, isFetching, error } = useQuery({
    queryFn: () => getOverview(axiosPrivate),
    queryKey: ["overview"],
  });

  useEffect(() => {
    if (data) {
      setOverviews(data.overview);
    }
  }, [data]);

  return (
    <div className="w-full px-5">
      {error && (
        <p className="text-error">
          Something went wrong, please refresh your browser!
        </p>
      )}
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
          {overviews.map((overview) => (
            <SwiperSlide key={overview.id}>
              <div
                className={`${
                  isFetching ? "animate-pulse" : ""
                } h-[120px] p-4 flex flex-col justify-between rounded-md bg-orange-500
                overflow-y-hidden overflow-x-auto`}
              >
                <p className="text-white">{overview.title}</p>
                <div className="text-2xl font-bold text-white">
                  {overview.title.toLowerCase() === "sales" ? (
                    `$${overview.value}`
                  ) : (
                    <p>
                      Total:{" "}
                      {data && overview.title.toLowerCase() === "bitcoin"
                        ? `${overview.value}btc`
                        : overview.value}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="button-swiper w-full h-full absolute top-0 right-0">
          <div className="swiper-button-prev ml-[-40px] after:text-orange-500"></div>
          <div className="swiper-button-next mr-[-40px] after:text-orange-500"></div>
        </div>
        <div className="absolute bottom-[-20px] left-[50%] translate-x-[-50%]">
          <div className="swiper-pagination-1 static flex gap-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
