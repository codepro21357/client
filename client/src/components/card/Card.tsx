import Image from "next/image";
import React from "react";

interface CardProps {
  icon: string;
  title: string;
  desc: string;
  bg?: boolean;
  isSwipperCard?: boolean;
}

const Card = ({ icon, title, desc, bg, isSwipperCard }: CardProps) => {
  return (
    <div
      className={`flex flex-col items-center gap-4 px-5 py-10 
        text-center rounded-md cursor-pointer  
        ${isSwipperCard ? "h-full " : "flex-1"}
        ${
          bg
            ? "box-shadow hover:text-white hover:bg-primary-500"
            : "border-[1px] border-solid border-gray-500"
        }`}
    >
      <div>
        <Image
          width={50}
          height={50}
          src={`/assets/icons/${icon}`}
          alt="Icon"
        />
      </div>
      <h3 className="text-[20px] font-semibold">{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default Card;
