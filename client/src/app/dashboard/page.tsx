"use client";

import Top from "./components/top/Top";
import Bottom from "./components/bottom/Bottom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useQuery } from "@tanstack/react-query";
import TopSkeleton from "./components/top/TopSkeleton";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getUser } from "@/services/users/api";
import { addUser } from "@/redux/slice/userSlice";
import ChatIcon from "./components/chatIcon/ChatIcon";
import Chat from "./components/chat/Chat";
import { Dialog } from "@/components/ui/dialog";
import DeleteAccount from "./components/deleteAccount/DeleteAccount";

const networkError =
  "getaddrinfo ENOTFOUND cluster0-shard-00-00.v33pl.mongodb.net";

const Dashboard = () => {
  const [client, setClient] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user?.user);

  const { data, isFetching, error } = useQuery({
    queryFn: () => getUser(axiosPrivate, user?._id),
    queryKey: ["user"],
  });

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (isFetching) {
      setShowChat(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (error) {
      const err = error as any;
      if (err?.response?.data?.message?.includes(networkError)) {
        toast.error("Network error, please check your internet connection");
      } else {
        toast.error("Something went wrong, try again later!");
      }
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      dispatch(addUser(data));
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <main className="w-full relative flex flex-col gap-5 bg-gray-200">
      <Dialog>
        <DeleteAccount />
        {isFetching ? <TopSkeleton /> : <Top user={data?.user} />}
        {client && user && !isFetching && !showChat && (
          <ChatIcon setShowChat={setShowChat} />
        )}
        <Chat showChat={showChat} setShowChat={setShowChat} />
        <Bottom />
      </Dialog>
    </main>
  );
};

export default Dashboard;
