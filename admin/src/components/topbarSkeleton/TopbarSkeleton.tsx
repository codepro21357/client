import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TopbarSkeleton = () => {
  return (
    <div className="h-[40px] flex justify-between items-center px-4 bg-gray-200">
      <Skeleton className="h-6 w-[250px]" />
      <div className="flex items-center gap-5">
        <Skeleton className="h-6 w-8" />
        <Skeleton className="h-6 w-8" />
        <Skeleton className="h-6 w-8" />
        <Skeleton className="h-6 w-8 rounded-full" />
        <Skeleton className="h-6 w-[80px]" />
      </div>
    </div>
  );
};

export default TopbarSkeleton;
