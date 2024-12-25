"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ChatScreen from "../chatScreen/ChatScreen";
import ChatForm from "../chatForm/ChatForm";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { createMessage, getUserChats } from "@/services/chats/api";
import { io, Socket } from "socket.io-client";
import { IMessageChat } from "@/types";
import { addChatList, clearChat } from "@/redux/slice/chatSlice";
import { FaArrowLeft } from "react-icons/fa";
import DeleteMessage from "../deleteMessage/DeleteMessage";

const Chat = () => {
  const { user } = useAppSelector((state) => state.user);
  const { chat, loading } = useAppSelector((state) => state.chat);
  const socket = useRef<Socket | null>(null);

  const chatRef = useRef(chat);
  const [activeUsers, setActiveUsers] = useState<string[] | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessageChat[] | null>(null);
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { data, isFetching, error } = useQuery({
    queryFn: () => getUserChats(axiosPrivate, chat?.userId),
    queryKey: ["adminUserChats", chat?.userId],
  });

  const { mutate: createMessageMutation, isPending } = useMutation({
    mutationFn: createMessage,
    onSuccess: (data) => {
      setMessage("");
      handleSocket(data.message);
      queryClient.invalidateQueries({
        queryKey: ["adminUserChats", chat?.userId],
      });
    },
  });

  const handleChat = () => {
    dispatch(clearChat());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;
    if (!user) return;
    if (!chat) return;

    const data = {
      senderId: user._id,
      chatId: chat.userId,
      name: `${user.firstName} ${user.lastName}`,
      message,
      avatar: user.avatar,
    };

    createMessageMutation({ axiosPrivate, data });
  };

  const handleSocket = (data: IMessageChat) => {
    socket.current?.emit("sendMessageToUser", data);
  };

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_BASE_URL);
  }, []);

  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      const socketUser = {
        userId: user._id,
        userRole: "admin",
      };

      socket.current?.emit("sendUser", socketUser);

      socket.current?.on("getUsers", (users) => {
        setActiveUsers(users.map((user: any) => user.userId));
      });

      socket.current?.on("getMessage", ({ message, chat }) => {
        if (chatRef.current?.userId === message?.senderId) {
          setMessages((prevMessages) =>
            prevMessages ? [...prevMessages, message] : [message]
          );
        }

        dispatch(addChatList(chat));
      });
    }
  }, [user]);

  return (
    <div
      className={`${
        chat ? "flex" : "hidden md:flex"
      } flex-1  flex-col overflow-hidden bg-white`}
    >
      <div
        className="h-[80px] px-5 flex justify-between items-center 
        text-white bg-orange-500"
      >
        {chat && !loading && (
          <div className="flex items-center gap-4">
            <div className="md:hidden cursor-pointer" onClick={handleChat}>
              <FaArrowLeft size={25} />
            </div>
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                fill
                src={chat?.avatar?.url ?? ""}
                alt="Profile Picture"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">{chat?.name}</span>
              {activeUsers?.includes(chat.userId) ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Online</span>
                </div>
              ) : (
                <span>Offline</span>
              )}
            </div>
          </div>
        )}
        {chat && !loading && <DeleteMessage socket={socket.current} />}
      </div>
      <ChatScreen messages={messages} />
      <ChatForm
        isPending={isPending}
        message={message}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Chat;
