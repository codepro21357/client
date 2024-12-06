"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { MdClose, MdEmail } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { GoBell, GoGear } from "react-icons/go";
import Badge from "@/components/badge/Badge";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/users/api";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { addUser } from "@/redux/slice/userSlice";
import toast from "react-hot-toast";
import TopbarSkeleton from "../topbarSkeleton/TopbarSkeleton";

interface TopProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const Top = ({ open, setOpen }: TopProps) => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const { user, userId } = useAppSelector((state) => state.user);

  const {
    data: currentUser,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getUser(axiosPrivate, userId),
    queryKey: ["adminUser"],
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (currentUser) {
      dispatch(addUser(currentUser));
    }
  }, [currentUser]);

  if (isFetching) {
    return <TopbarSkeleton />;
  }

  return (
    <div className="h-[40px] flex justify-between items-center px-4 bg-gray-200">
      <div className="flex gap-4">
        <div className="flex justify-center items-center">
          <div
            className="xl:hidden z-40 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <MdClose size={25} color="white" />
            ) : (
              <GiHamburgerMenu size={25} color="black" />
            )}
          </div>
        </div>
        <div>
          <form className="flex justify-center gap-5 items-center bg-white px-2  ">
            <span>
              <CiSearch size={15} />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none"
            />
          </form>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex justify-around items-center gap-5 px-5">
          <div className="flex justify-center items-center gap-5">
            <div>
              <Badge content={6}>
                <MdEmail size={15} />
              </Badge>
            </div>
            <div>
              <Badge content={10}>
                <GoBell size={15} />
              </Badge>
            </div>
            <div>
              <GoGear size={15} />
            </div>
          </div>
          <div className=" flex justify-center items-center gap-5">
            <div className="relative  h-5 w-5  flex justify-center items-center">
              <Image
                fill
                src={user ? user.avatar?.url : "/assets/profile.png"}
                alt="Profile image"
                className=" h-5 w-5 rounded-full "
              />
            </div>
            <div className="flex justify-center items-center">
              {user && <span>{`${user.firstName} ${user?.lastName}`}</span>}
              <span>
                <RiArrowDropDownLine size={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
