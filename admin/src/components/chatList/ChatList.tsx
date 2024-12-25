"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllChats } from "@/services/chats/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IChat } from "@/types";
import { addChat, addChatList, updateLoading } from "@/redux/slice/chatSlice";

dayjs.extend(relativeTime);

const ChatList = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { chat, chatList, refetch } = useAppSelector((state) => state.chat);

  const { data, isFetching, error } = useQuery({
    queryFn: () => getAllChats(axiosPrivate, user?._id),
    queryKey: ["allChats", refetch],
  });

  const handleChat = (currentChat: IChat) => {
    dispatch(addChat(currentChat));
  };

  useEffect(() => {
    dispatch(updateLoading(isFetching));
  }, [isFetching]);

  useEffect(() => {
    if (data) {
      dispatch(addChatList(data?.chats));
    }
  }, [data]);

  return (
    <div className={`${chat ? "hidden md:flex" : "flex"} flex-1 flex-col`}>
      <div
        className="h-[80px] px-5 flex justify-between items-center 
        text-white bg-orange-500"
      >
        <h2 className="font-bold">Chat List</h2>
      </div>
      <div className="flex-1 p-5 flex flex-col gap-4 border-r-2 overflow-y-auto bg-white">
        {error && <p className="text-sm text-error">Network error</p>}
        {isFetching ? (
          <p>Loading chats...</p>
        ) : (
          chatList
            .slice()
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .map((chat) => (
              <div
                key={chat._id}
                onClick={() => handleChat(chat)}
                className="p-4 flex justify-between gap-2 rounded-md shadow-lg cursor-pointer"
              >
                <div className="flex gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      fill
                      src={chat?.avatar?.url}
                      alt="Profile Picture"
                      className="object-cover"
                    />
                  </div>
                  <div className="">
                    <h4 className="font-[500] flex gap-1">
                      <span>{chat?.name?.split(" ")[0]}</span>
                      <span className="hidden md:block">
                        {chat?.name?.split(" ")[1]}
                      </span>
                    </h4>
                    <p className="flex text-gray-500">
                      {chat?.lastMessage?.length > 15 ? (
                        <>
                          <span>{chat?.lastMessage?.substring(0, 15)}</span>
                          <span>...</span>
                        </>
                      ) : (
                        chat?.lastMessage
                      )}
                    </p>
                  </div>
                </div>
                <span> {dayjs(chat?.updatedAt).fromNow()}</span>
              </div>
            ))
        )}
        {chatList?.length === 0 && !isFetching && (
          <div className="p-4 rounded-md shadow-lg">No chat</div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
