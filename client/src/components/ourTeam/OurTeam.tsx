"use client";

import React from "react";
import Container from "../container/Container";
import Member from "./member/Member";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const OurTeam = () => {
  const members = [
    {
      id: 1,
      name: "Mike Smith",
      job: "Software Engineer",
      img: "member-1.jpg",
    },
    {
      id: 2,
      name: "Charles Richard",
      job: "Manager",
      img: "member-2.jpg",
    },
    {
      id: 3,
      name: "Sharon Luis",
      job: "Marketer",
      img: "member-3.jpg",
    },
    {
      id: 4,
      name: "John Robert",
      job: "Python Developer",
      img: "member-5.avif",
    },
    {
      id: 5,
      name: "Kevin Brian",
      job: "Data Scientist",
      img: "member-6.jpg",
    },
  ];
  return (
    <section className="section-padding min-h-screen">
      <Container>
        <div>
          <h2 className="secondary-heading text-center">Our Team Members</h2>
          <p className="md:text-center">
            Meet our awesome team to learn more about our company or any kind of
            help.
          </p>
          <div className="w-full mt-10 md:mt-14">
            <div className="box-shadow relative">
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
                  768: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 4,
                  },
                }}
              >
                {members.map((member) => (
                  <SwiperSlide key={member.id}>
                    <Member
                      name={member.name}
                      job={member.job}
                      img={member.img}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="button-swiper">
                <div className="swiper-button-prev after:text-primary-500"></div>
                <div className="swiper-button-next after:text-primary-500"></div>
              </div>
              <div className="pagination-wrapper-1">
                <div className="swiper-pagination-1"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurTeam;
