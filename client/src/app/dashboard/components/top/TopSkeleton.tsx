import React from "react";
import Container from "@/components/container/Container";
import { Skeleton } from "@/components/ui/skeleton";

const TopSkeleton = () => {
  return (
    <div className="h-[200px] mb-5 py-5 shadow-lg bg-white">
      <Container>
        <div className="flex gap-5">
          <div className="flex flex-col gap-5">
            <Skeleton className="w-[100px] h-[100px] rounded-full" />
            <div className="flex justify-center mb-5">
              <Skeleton className="w-[170px] h-[20px]" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-12">
            <div className="hidden xl:flex justify-between gap-10">
              {Array(5)
                .fill(0)
                .map((item, index) => (
                  <div className="flex flex-col gap-2" key={index}>
                    <Skeleton className="w-[100px] h-[20px]" />
                    <Skeleton className="w-[70px] h-[20px]" />
                  </div>
                ))}
              <Skeleton className="w-[50px] h-[50px] rounded-full" />
            </div>
            <div
              className="self-end flex flex-col xl:flex-row justify-between 
              xl:justify-start xl:items-center gap-10 xl:gap-5"
            >
              <Skeleton className="xl:hidden w-[50px] h-[50px] rounded-full" />
              <Skeleton className="hidden xl:block w-[100px] h-[40px]" />
              <Skeleton className="hidden xl:block w-[100px] h-[40px]" />
              <Skeleton className="w-[100px] h-[40px]" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopSkeleton;
