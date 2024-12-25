"use client";

import React from "react";
import Container from "../container/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Button from "../button/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegStar, FaStar } from "react-icons/fa";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { reviews } from "@/data";

interface ReviewsProps {
  all?: boolean;
}

const Reviews = ({ all }: ReviewsProps) => {
  const size = all ? reviews.length : 4;

  return (
    <section className="w-full min-h-screen section-padding">
      <Container>
        <div className="flex flex-col items-center gap-5">
          {!all && <span className="text-primary-500">Reviews</span>}
          <h2 className="secondary-heading text-center">
            We Care About Our <br className="hidden md:block" /> Customers
            Experience Too
          </h2>
        </div>
        <div className="relative mt-10">
          <Swiper
            loop
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination-2",
              type: "bullets",
            }}
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
          >
            {reviews.slice(0, size).map((rev) => (
              <SwiperSlide key={rev.id}>
                <Card
                  className="flex flex-col md:flex-row items-center md:items-start rounded-3xl
                   bg-secondary-500 cursor-pointer"
                >
                  <CardHeader>
                    <Avatar className="w-[100px] h-[100px]">
                      <AvatarImage
                        src={`/assets/reviews/${rev.img}`}
                        alt="Client Image"
                        className="object-cover"
                      />
                      <AvatarFallback>Client image</AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <div>
                    <CardHeader>
                      <CardTitle>{rev.name}</CardTitle>
                      <CardDescription>{rev.accountType}</CardDescription>
                      <div className="flex gap-1">
                        {Array(5)
                          .fill(0)
                          .map((item, index) =>
                            index < rev.star ? (
                              <FaStar key={index} className="text-yellow-400" />
                            ) : (
                              <FaRegStar
                                key={index}
                                className="text-gray-600"
                              />
                            )
                          )}
                      </div>
                    </CardHeader>
                    <CardContent>{rev.review}</CardContent>
                    <CardFooter>
                      <Button type="primary" rounded>
                        Read More
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          {all && (
            <div className="button-swiper">
              <div className="swiper-button-prev after:text-primary-500"></div>
              <div className="swiper-button-next after:text-primary-500"></div>
            </div>
          )}
          <div className="pagination-wrapper-2">
            <div className="swiper-pagination-2"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Reviews;
