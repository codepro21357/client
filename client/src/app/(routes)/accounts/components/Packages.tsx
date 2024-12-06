import Button from "@/components/button/Button";
import Link from "next/link";
import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
const styles = "flex  items-center gap-2 py-2";

interface IBenefit {
  id: number;
  title: string;
}

interface PackagesProps {
  type: string;
  amount: string;
  benefits: IBenefit[];
}

const Packages = ({ type, amount, benefits }: PackagesProps) => {
  return (
    <div className="wrapper">
      <h1 className="text-xl font-semibold py-1">{type}</h1>
      <p className="text-xl font-semibold text-red-400 pb-3">{amount}</p>
      <div className="check-wrapper">
        {benefits.map((benefit) => (
          <div key={benefit.id} className={styles}>
            <span>
              <GiCheckMark size={20} />
            </span>
            <h2>{benefit.title}</h2>
          </div>
        ))}
        <div className="my-2 py-2">
          <Link href="/register">
            <Button type="primary" size="big" rounded>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Packages;
