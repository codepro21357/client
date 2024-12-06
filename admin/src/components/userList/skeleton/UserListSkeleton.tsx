import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UserListSkeleton = () => {
  return (
    <div className="mt-5 flex flex-col gap-5">
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
    </div>
  );
};

export default UserListSkeleton;
