"use client";

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Card from "@/components/card/Card";
import Container from "@/components/container/Container";

const WhyInvest = () => {
  const cards = [
    {
      id: 1,
      icon: "globalNetwork.png",
      title: "Fast and Global",
      desc: `Cryptocurrency is fast and global due to its decentralized nature and the
       use of cryptography for secure transactions. This allows for rapid transfer of funds 
       across borders without the need for intermediaries, such as banks, which can slow down 
       the process.`,
    },
    {
      id: 2,
      icon: "insurance.png",
      title: "Irreversible",
      desc: `The irreversibility of cryptocurrency transactions provides a high level 
      of security and trust in the network, as it ensures that once a transaction is made, 
      it cannot be altered or reversed.`,
    },
    {
      id: 3,
      icon: "safe.png",
      title: "Secured",
      desc: `Cryptocurrency is considered safe and secure due to its underlying technology, 
      cryptography. This advanced mathematical algorithm ensures that transactions are virtually 
      impossible to counterfeit or double-spend.`,
    },
    {
      id: 4,
      icon: "guaranteeCertificate.png",
      title: "Guaranteed Security",
      desc: `To protect cryptocurrencies, it is essential to use secure wallets, implement 
      two-factor authentication, avoid keeping coins on exchanges, keep software up-to-date, 
      use secure networks, and be wary of phishing attempts.`,
    },
    {
      id: 5,
      icon: "wallet.png",
      title: "Crypto Wallet",
      desc: `A crypto wallet is a software program or physical device that stores the private keys 
      used to manage and secure cryptocurrency transactions. It allows users to send, receive, and 
      store cryptocurrencies like Bitcoin, Ethereum, and others.`,
    },
    {
      id: 6,
      icon: "technicalSupport.png",
      title: "Technical Support",
      desc: `Crypto technical support can be offered by cryptocurrency exchanges, wallets, or other 
      service providers. Technical support teams can help with issues such as lost or forgotten passwords, 
      transaction errors, or difficulties with accessing accounts. `,
    },
  ];
  return (
    <section className="w-full min-h-screen section-padding text-white bg-primary-500">
      <Container>
        <div>
          <h2 className="secondary-heading text-center">
            Why Invest in Crypto?
          </h2>
          <p className="md:text-center">
            One of the primary reasons to invest in crypto is its potential for
            long-term growth, <br className="hidden md:block" /> as seen with
            Bitcoin, the largest cryptocurrency globally.
          </p>
        </div>
        <div className="w-full relative mt-10 md:mt-14">
          <Swiper
            loop
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
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
              992: {
                slidesPerView: 3,
              },
            }}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <Card
                  icon={card.icon}
                  title={card.title}
                  desc={card.desc}
                  isSwipperCard
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="button-swiper">
            <div className="swiper-button-prev after:text-white/60"></div>
            <div className="swiper-button-next after:text-white/60"></div>
          </div>
          <div className="pagination-wrapper">
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyInvest;
