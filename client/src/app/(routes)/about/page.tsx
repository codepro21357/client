import Container from "@/components/container/Container";
import Image from "next/image";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { SiMarketo } from "react-icons/si";
import { SiNginxproxymanager } from "react-icons/si";
import { SiManageiq } from "react-icons/si";

import Card from "./components/Card";
import Button from "@/components/button/Button";
import Reviews from "@/components/reviews/Reviews";
import { GiMidnightClaw } from "react-icons/gi";
const headingStyle = "text-3xl font-bold";

const buttonStyles = `flex justify-center items-center h-10 w-10 border-2 border-gray-200 
  text-black rounded-full hover:text-white hover:bg-primary-400`;
const LiStyle = "text-xl font-bold";
const spanWrapperStyle = "flex flex-col gap-6";
const myStyle = "flex justify-center items-center gap-5 py-5";
const imageStyle = "relative h-[300px] w-full md:w-1/2";

const aboutUs = [
  {
    id: 1,
    title: "Our Mission",
    desc: `At Reinholders, our mission is to provide our customers with access to a 
    wide range of investment opportunities and empower them to make informed trading 
    decisions`,
    img: "mission.svg",
  },
  {
    id: 2,
    title: "Our Vision",
    desc: `We aim to build a community that fosters growth, education and sustainability, 
    and empowers individuals from all backgrounds to navigate the trading world with 
    confidence`,
    img: "vision.svg",
  },
  {
    id: 3,
    title: "Our Philosophy",
    desc: `We believe in a client-centric approach, where our customers' interests always 
    come first. We are committed to upholding the highest standards of transparency, and 
    fairness in all our dealings`,
    img: "philosophy.svg",
  },
  {
    id: 4,
    title: "Our Approach",
    desc: `We take a comprehensive approach to trading by combining cutting-edge technology, 
    in-depth market research, and personalized support`,
    img: "approach.svg",
  },
];

const About = () => {
  return (
    <section className="pt-[120px] md:pt-[180px]">
      <Container>
        <div className="flex flex-col-reverse xl:flex-row gap-12">
          <div className="flex-1 flex flex-col">
            <div
              className="list-wrapper flex-1 py-5 xl:py-0 flex justify-between 
              items-center gap-5"
            >
              <ul>
                <li className={LiStyle}>Our Story / Chronology</li>
              </ul>
              <a href="#OurStory/Chronology">
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />

            <div
              className="list-wrapper flex-1 py-5 xl:py-0 flex justify-between 
              items-center gap-5"
            >
              <ul>
                <li className={LiStyle}>Our Mission/Approach</li>
              </ul>
              <a href="#OurMission/Approach">
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div
              className="list-wrapper flex-1 py-5 xl:py-0 flex justify-between 
              items-center gap-5"
            >
              <ul>
                <li className={LiStyle}>Our Values</li>
              </ul>
              <a href="#OurValues">
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
            <div
              className="list-wrapper flex-1 py-5 xl:py-0 flex justify-between 
              items-center gap-5"
            >
              <ul>
                <li className={LiStyle}>They talk...</li>
              </ul>
              <a href="#Theytalk...">
                {" "}
                <button className={buttonStyles}>
                  <HiArrowLongRight size={25} />
                </button>
              </a>
            </div>
            <hr className="border-[1px] border-gray-300" />
          </div>
          <div
            className="flex-[2] p-10 flex flex-col gap-10 rounded-[12px] bg-primary-400 
            bg-image-gradient bg-size bg-no-repeat"
          >
            <h3 className="w-fit px-14 py-4 font-bold rounded-full uppercase bg-[#d4dcfe]">
              About Us
            </h3>
            <p className="text-4xl md:text-[56px] font-neueMetana font-bold leading-tight">
              Explore for <br className="hidden md:block" /> yourself our{" "}
              <br className="hidden md:block" /> philoso­phy
            </p>
          </div>
        </div>
        <div
          className="mt-20 py-20 px-5 rounded-md bg-image-gradient bg-size bg-no-repeat"
          id="OurStory/Chronology"
        >
          <div className="flex flex-col justify-center items-center">
            <h3 className="w-fit px-14 py-4 font-bold rounded-full uppercase bg-[#d4dcfe]">
              Chronology
            </h3>
            <div className=" h-auto flex justify-start items-center pl-0 md:pl-10  md:mt-8 mt-5 pt-10 md:pt-5">
              <p
                className="text-4xl md:text-[56px] text-center font-neueMetana 
                font-bold leading-tight"
              >
                Learn Our
                <br className="hidden lg:block" />
                History
              </p>
            </div>
          </div>

          <div
            className="wrapper mt-20 px-5 py-10 flex flex-col md:flex-row justify-between gap-5 
             rounded-md bg-white"
          >
            <div className="px-2 flex-1 flex flex-col gap-10">
              <h1 className={headingStyle}>The birth of our company</h1>
              <div className="flex-1 flex flex-col justify-between gap-10">
                <p className="text-xl ">
                  On August 15, 2019, our company was founded by John Doe and
                  Jane Smith. With a shared passion for trading and a vision for
                  creating a platform that addressed the needs of both beginner
                  and experienced traders, they set out to establish a reliable
                  and user-friendly trading website
                </p>
                <div className={spanWrapperStyle}>
                  <span className="text-2xl font-bold">August 15, 2019</span>
                  <span className="font-semibold text-xl text-gray-500">
                    {`Company's`} Founding
                  </span>
                </div>
              </div>
            </div>
            <div className="px-2 flex-1 flex flex-col gap-10">
              <h1 className={headingStyle}>Expansion into Global Markets</h1>
              <div className="flex-1 flex flex-col justify-between gap-10">
                <p className="text-xl">
                  The date represents a significant milestone in our{" "}
                  {`company's`}
                  history. With an aim to serve traders worldwide, we introduced
                  multi-language support and implemented advanced trading tools
                  to cater to the diverse needs of our international clientele
                </p>
                <div className={spanWrapperStyle}>
                  <span className="text-2xl font-bold">March 22, 2021</span>
                  <span className="font-semibold text-xl text-gray-500">
                    {`Company's`} Global Expansion
                  </span>
                </div>
              </div>
            </div>
            <div className="px-2 flex-1 flex flex-col gap-10">
              <h1 className={headingStyle}>Innovative Trading Features</h1>
              <div className="flex-1 flex flex-col justify-between gap-10">
                <p className="text-xl">
                  December 10, 2023, marks a breakthrough moment for our company
                  when we introduced a range of innovative trading features that
                  revolutionized the way traders interacted with our platform.
                  These new features included advanced charting tools, real-time
                  market data, and customizable trading indicators
                </p>
                <div className={spanWrapperStyle}>
                  <span className="text-2xl font-bold">December 10, 2023</span>
                  <span className="font-semibold text-xl text-gray-500">
                    Trading capabilities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10 flex flex-col md:flex-row justify-center gap-5">
          <div className={`${imageStyle} hidden md:block`}>
            <Image fill src="/assets/about1.png" alt="Crypto image" />
          </div>
          <div className={imageStyle}>
            <Image fill src="/assets/about2.png" alt="Crypto image" />
          </div>
        </div>
        <div
          id="OurMission/Approach"
          className="rounded-md bg-image-gradient bg-size bg-no-repeat"
        >
          <div className="wrapper w-full h-auto mt-20 px-5 py-20 ">
            <div className="flex flex-col items-start gap-6 mb-10 md:mb-20">
              <h3 className="w-fit px-14 py-4 font-bold rounded-full uppercase bg-[#d4dcfe]">
                About us
              </h3>

              <p
                className="md:ml-[80px] text-4xl md:text-[56px] text-center font-neueMetana 
                font-bold leading-tight"
              >
                Explore more <br className="hidden lg:block" /> about us!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-5">
              {aboutUs.map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  desc={item.desc}
                  img={item.img}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="flex flex-col md:flex-row justify-between gap-8 mt-20"
          id="OurValues"
        >
          <div className="flex-1 flex flex-col gap-5">
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
              <Button type="gradient" size="full" rounded>
                Choose an account
              </Button>
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
        </div>
        <div className="reviews" id="Theytalk...">
          <Reviews />
        </div>
      </Container>
    </section>
  );
};

export default About;
