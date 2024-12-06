import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex-1 flex flex-col gap-5 px-5 py-10 shadow-lg bg-white overflow-y-auto">
      <Skeleton className="w-full h-[40px]" />
      <div className="flex flex-col gap-2">
        {Array(5)
          .fill(0)
          .map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
              <Skeleton className="flex-1 h-[20px]" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkeletonCard;
