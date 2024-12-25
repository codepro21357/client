"use client";
import Container from "@/components/container/Container";
import React, { useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import Packages from "./components/Packages";
import Premium from "./components/Premium";
import Link from "next/link";
import Button from "@/components/button/Button";
import { SiManageiq, SiMarketo, SiNginxproxymanager } from "react-icons/si";
import Reviews from "@/components/reviews/Reviews";
import { bronze, diamond, gold, platinum, silver } from "@/data";
const myStyle = "flex justify-center items-center gap-5 py-5";
// STATE TO HANDLE PACKAGES
const Accounts = () => {
  const [standard, setStandard] = useState(true);
  const [premium, setPremium] = useState(false);

  const handleStandard = () => {
    setPremium(false);
    setStandard(true);
  };
  const handlePremium = () => {
    setStandard(false);
    setPremium(true);
  };

  return (
    <section className="pt-[120px] ">
      <Container>
        <div className="flex justify-center items-center">
          <div className="flex justify-center flex-col ">
            <h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold my-2 text-primary-500 ">
              Our
            </h1>
            <h2 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold  mb-3 text-primary-500 ">
              Accounts
            </h2>
            <p className="text-center ">
              Don&apos;t miss out on the potential for growth and profitability.
            </p>
            <p className="text-center">
              Experience the power of our cutting-edge tools, extensive
            </p>
            <p className="text-center">
              market insights, and dedicated support
            </p>
          </div>
        </div>
        <div className="  h-20 flex justify-center items-center my-10 py-5">
          <Link
            href="#select"
            className="w-14 h-14 bg-black flex justify-center items-center  rounded-full"
          >
            <FaArrowDownLong size={20} color="white" />
          </Link>
        </div>
        {/* PACKAGES */}
        <div className="p-5 bg-[#d4dcfe] rounded-xl">
          <div className="flex justify-center items-center h-20 ">
            <h3 className="text-lg px-14 py-3 w-max  bg-white rounded-full font-semibold  text-primary-500">
              Time to choose!
            </h3>
          </div>
          <div className="py-5 flex flex-col font-semibold" id="select">
            <p className="text-4xl text-center">
              Look at the array of <br className="hidden md:block" /> our
              accounts
            </p>
          </div>
          <div className=" mt-4  h-12 flex justify-center items-center ">
            <div className="h-full bg-white w-[400px] flex rounded-full ">
              <button
                type="button"
                className={` ${
                  standard ? "bg-primary-400" : " bg-white"
                } flex-1 flex items-center justify-center rounded-l-full outline-none   `}
                onClick={handleStandard}
              >
                Standard
              </button>
              <button
                type="button"
                className={`${
                  premium ? "bg-primary-400" : "bg-white"
                } flex-1  flex items-center justify-center rounded-r-full outline-none`}
                onClick={handlePremium}
              >
                Premium
              </button>
            </div>
          </div>
          <div className="p-4">
            <div
              className={`${
                standard ? "block" : "hidden"
              } mt-10 bg-white rounded-lg`}
            >
              <div className="p-10 flex justify-between flex-wrap gap-10">
                <Packages
                  type="BRONZE"
                  amount="$1000-$4999"
                  benefits={bronze}
                />
                <Packages
                  type="SILVER"
                  amount="$5000-$9999"
                  benefits={silver}
                />
                <Packages type="GOLD" amount="$10000-$14999" benefits={gold} />
                <Packages
                  type="DIAMOND"
                  amount="$15000-$19999"
                  benefits={diamond}
                />
                <Packages
                  type="PLATINUM"
                  amount="$20000-$29999"
                  benefits={platinum}
                />
              </div>
            </div>
            <div className={` ${premium ? "block " : "hidden"} mt-10 py-3`}>
              <div className="mt-10 py-3  bg-white rounded-lg">
                {" "}
                <Premium level="VIP" price="30000" />
              </div>
              <div className="mt-10 py-3  bg-white rounded-lg">
                {" "}
                <Premium level="VIP+" price="1 Bitcoin" />
              </div>
            </div>
          </div>
        </div>
        {/* POTENTIAL */}
        <div className="flex-1 flex flex-col gap-5 mt-10">
          <h3
            className="text-4xl md:text-[56px] font-neueMetana 
                font-bold leading-tight"
          >
            Unlock your <br /> potential <br /> with us
          </h3>
          <p className="md:w-[70%]">
            Through our carefully crafted resources, expert guidance, and
            inspiring content, we aim to inspire personal growth and help
            individuals break free from limitations
          </p>
          <div className="py-5 text-white">
            <Link href="/register">
              <Button type="gradient" size="full" rounded>
                Choose an account
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          <div className=" flex-1 flex flex-col gap-3 mt-10 text-4xl font-bold">
            <div className={myStyle}>
              <span>
                <SiMarketo size={35} />
              </span>
              <span>Market Insights</span>
            </div>
            <div className={myStyle}>
              <span>
                <SiNginxproxymanager size={35} />
              </span>
              <span>Analytical Integration</span>
            </div>
            <div className={myStyle}>
              <span>
                <SiManageiq size={35} />
              </span>
              <span>Risk Management</span>
            </div>
          </div>
        </div>
        <div className="reviews" id="Theytalk...">
          <Reviews />
        </div>
      </Container>
    </section>
  );
};

export default Accounts;
