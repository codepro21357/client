import Container from "@/components/container/Container";
import Image from "next/image";
import React from "react";
import { GiMidnightClaw } from "react-icons/gi";
interface CardProps {
  title: string;
  desc: string;
  img: string;
}

const Card = ({ title, desc, img }: CardProps) => {
  return (
    <div className="flex-1 p-5 flex flex-col gap-5 bg-white rounded-[20px]">
      <div className="relative w-[60px] h-[60px]">
        <Image fill src={`/assets/icons/${img}`} alt={`${title} image`} />
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default Card;
