"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditUser from "@/components/editUser/EditUser";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getUser } from "@/services/users/api";
import UserSkeleton from "@/components/userSkeleton/UserSkeleton";

const User = () => {
  const params = useParams();
  const id = params.id as string;

  const axiosPrivate = useAxiosPrivate();

  const { data, isFetching, error } = useQuery({
    queryFn: () => getUser(axiosPrivate, id),
    queryKey: ["user", id],
  });

  if (isFetching && !data) {
    return <UserSkeleton />;
  }

  return (
    <section className="w-full min-h-[calc(100vh-40px)] bg-white">
      {error && (
        <div className="px-5 py-7">
          <p className="text-error">
            Something went wrong, please refresh your browser!
          </p>
        </div>
      )}
      <div className="px-5 py-7 flex flex-col gap-5">
        <div className="p-5 flex flex-col gap-5 rounded-lg bg-white shadow-lg">
          <h3 className="text-2xl font-bold">User Details</h3>
          <div className="flex flex-col md:flex-row items-start gap-10">
            <Avatar className="w-[120px] h-[120px] self-center md:self-start">
              <AvatarImage src={data?.user?.avatar?.url} alt="Profile" />
              <AvatarFallback>
                <Avatar className="w-[120px] h-[120px]">
                  <AvatarImage src="/assets/profile.png" alt="Fall back" />
                </Avatar>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-5">
              <p className="capitalize">
                <b>First name:</b>{" "}
                {data && <span>{data?.user?.firstName}</span>}
              </p>
              <p className="capitalize">
                <b>Last name:</b> {data && <span>{data?.user?.lastName}</span>}
              </p>
              <p className="capitalize">
                <b>Phone Number:</b>{" "}
                {data && <span>{data?.user?.phoneNumber}</span>}
              </p>
              <p>
                <b>Email:</b> {data && <span>{data?.user?.email}</span>}
              </p>
              <p className="capitalize">
                <b>Country:</b> {data && <span>{data?.user?.country}</span>}
              </p>
              <p className="capitalize">
                <b>Terms of use:</b>{" "}
                {data && (
                  <span>{data?.user?.agreement ? "Agreed" : "Disagreed"}</span>
                )}
              </p>
              <p className="capitalize">
                <b>Role:</b> {data && <span>{data?.user?.role}</span>}
              </p>
              <p className="capitalize">
                <b>Balance:</b> $ {data && <span>{data?.user?.balance}</span>}
              </p>
              <p className="capitalize">
                <b>Equity:</b> $ {data && <span>{data?.user?.equity}</span>}
              </p>
              <p className="capitalize">
                <b>Open PL:</b> $ {data && <span>{data?.user?.openPl}</span>}
              </p>
              <p className="capitalize">
                <b>Close PL:</b> $ {data && <span>{data?.user?.closePl}</span>}
              </p>
              <p className="capitalize">
                <b>Free Margin:</b> ${" "}
                {data && <span>{data?.user?.freeMargin}</span>}
              </p>
              <p className="capitalize">
                <b>Margin Level:</b> ${" "}
                {data && <span>{data?.user?.marginLevel}</span>}
              </p>
              <p className="capitalize">
                <b>Credit:</b> $ {data && <span>{data?.user?.credit}</span>}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-bold capitalize">Home address</h4>
            {data && <p>{data?.user?.address}</p>}
          </div>
        </div>
        {data && <EditUser id={id} user={data.user} />}
      </div>
    </section>
  );
};

export default User;
