"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import ChatScreen from "../chatScreen/ChatScreen";
import ChatForm from "../chatForm/ChatForm";
import { useAppSelector } from "@/hooks/redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessage, getUserChats } from "@/services/chats/api";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { io, Socket } from "socket.io-client";
import { IChat, IMessageChat, ISocketUser } from "@/types";
import toast from "react-hot-toast";
import Notification from "../notification/Notification";

interface ChatProps {
  showChat: boolean;
  setShowChat: (value: boolean) => void;
}

interface ICreateMessageData {
  message: IMessageChat;
  chat: IChat;
}

const Chat = ({ showChat, setShowChat }: ChatProps) => {
  const [message, setMessage] = useState("");
  const user = useAppSelector((state) => state.user?.user);
  const socket = useRef<Socket | null>(null);
  const showChatRef = useRef(showChat);
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<IMessageChat[] | null>(null);

  const { data } = useQuery({
    queryFn: () => getUserChats(axiosPrivate, user?._id),
    queryKey: ["chats"],
  });

  const { mutate: createMessageMutation, isPending } = useMutation({
    mutationFn: createMessage,
    onSuccess: (data) => {
      setMessage("");
      handleSocket(data.data);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;
    if (!user) return;

    const data = {
      senderId: user._id,
      chatId: user._id,
      name: `${user.firstName} ${user.lastName}`,
      message,
      avatar: user.avatar,
    };

    createMessageMutation({ axiosPrivate, data });
  };

  const handleSocket = (data: ICreateMessageData) => {
    socket.current?.emit("sendMessage", data);
  };

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_BASE_URL);
  }, []);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    showChatRef.current = showChat;
  }, [showChat]);

  useEffect(() => {
    if (user) {
      const socketUser = {
        userId: user._id,
        userRole: "user",
      };

      socket.current?.emit("sendUser", socketUser);

      // I added this to prevent adding multiple event listener, cause i figured out getMessage event was somehow called 3 times
      if ((socket.current?.listeners("getMessage") ?? []).length > 0) {
        socket.current?.off("getMessage");
      }

      socket.current?.on("getMessage", (message) => {
        setMessages((prevMessages) =>
          prevMessages ? [...prevMessages, message] : [message]
        );

        if (!showChatRef.current) {
          toast.custom(() => <Notification message={message?.message} />);
        }
      });

      socket.current?.on("deleteMessage", (userId) => {
        if (userId === user._id) {
          setMessages(null);
        }
      });
    }
  }, [user]);

  return (
    <div
      className={`w-full h-screen flex justify-center items-center fixed top-0 
      right-0 left-0 z-40 scale-y-0 origin-bottom transition-all duration-300 bg-black/50 
      ${showChat ? "scale-y-100" : ""}`}
    >
      <div
        className="w-full md:w-[400px] h-full md:h-[calc(100%-40px)] md:max-h-[450px] 
        my-5 md:rounded-2xl flex flex-col overflow-hidden bg-white"
      >
        <div className="p-5 flex justify-between text-white bg-purple-500">
          <div className="flex gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                fill
                src="/assets/profile.png"
                alt="Profile Picture"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Customer Service</span>
              <span className="italic">Support Agent</span>
            </div>
          </div>
          <div className="cursor-pointer" onClick={() => setShowChat(false)}>
            <IoMdClose size={25} />
          </div>
        </div>
        <ChatScreen messages={messages} />
        <ChatForm
          isPending={isPending}
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Chat;
