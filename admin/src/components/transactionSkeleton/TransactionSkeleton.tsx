import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TransactionSkeleton = () => {
  return (
    <section className="w-full min-h-[calc(100vh-40px)] bg-white">
      <div className="px-5 py-7 flex flex-col gap-8">
        <Skeleton className="hidden md:block w-[460px] h-8" />
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-5">
            <Skeleton className="md:w-[260px] h-8" />
            <Skeleton className="md:w-[260px] h-8" />
            <Skeleton className="md:w-[260px] h-8" />
            <Skeleton className="hidden md:block w-[260px] h-8" />
            <Skeleton className="hidden md:block w-[260px] h-8" />
            <Skeleton className="hidden md:block w-[260px] h-8" />
            <Skeleton className="hidden md:block w-[260px] h-8" />
          </div>
          <div className="h-[250px] md:h-auto md:flex-1">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionSkeleton;
