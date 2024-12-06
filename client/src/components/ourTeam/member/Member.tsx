import React from "react";
import Image from "next/image";
import SocialIcons from "@/components/socialIcons/SocialIcons";

interface MemberProps {
  name: string;
  job: string;
  img: string;
}

const Member = ({ name, job, img }: MemberProps) => {
  return (
    <div className="flex-1 p-5 box-shadow">
      <div className="w-full h-[350px] relative">
        <Image
          fill
          src={`/assets/team/${img}`}
          alt="Team member"
          className="object-contain md:object-cover"
        />
      </div>
      <div className="p-4 flex flex-col items-center gap-3 bg-white">
        <h3 className="text-[20px] font-semibold">{name}</h3>
        <p className="text-gray-600">{job}</p>
        <SocialIcons />
      </div>
    </div>
  );
};

export default Member;
