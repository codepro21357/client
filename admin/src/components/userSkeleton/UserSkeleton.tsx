import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const UserSkeleton = () => {
  return (
    <section className="w-full bg-white">
      <div className="px-5 py-7 flex flex-col gap-5">
        <div className="w-full px-5 py-8 flex flex-col gap-5 bg-white shadow-lg">
          <Skeleton className="w-[140px] h-8" />
          <div className="flex flex-col md:flex-row gap-5">
            <Skeleton className="w-[120px] h-[120px] rounded-full" />
            <div className="w-full flex flex-col gap-5">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
            </div>
          </div>
        </div>
        <div className="w-full px-5 py-8 flex flex-col gap-5 bg-white shadow-lg">
          <Skeleton className="w-[140px] h-8" />
          <div className="grid md:grid-cols-2 gap-5">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
          <Skeleton className="w-[100px] h-10" />
        </div>
      </div>
    </section>
  );
};

export default UserSkeleton;
