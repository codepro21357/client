import Button from "@/components/button/Button";
import Link from "next/link";
import React from "react";

interface PremiumProps {
  level: string;
  price: string;
}

const Premium = ({ level, price }: PremiumProps) => {
  return (
    <div className="px-4 my-3 py-2">
      <div className="bg-white rounded-lg text-wrap">
        <h1 className="text-xl font-semibold py-1">{level}</h1>
        <p className="text-xl font-semibold text-red-400 pb-3">${price}</p>
        <div className="">
          <p className="my-3 text-xl font-semibold">
            You have the opportunity to become a member of our premium VIP
            Trading Club, promising remarkable returns
          </p>
          <p className="text-gray-500 py-3">
            By joining, you gain unlimited access to our proficient trading team
            via an exclusive Telegram group. Benefit from insights into trades
            and trading techniques, including risk management strategies shared
            by our leading trading professionals. Equip yourself with an edge
            that only a few traders possess
          </p>
        </div>
      </div>
      <Link href="/register">
        <Button type="primary" size="big">
          Open account
        </Button>
      </Link>
    </div>
  );
};

export default Premium;
