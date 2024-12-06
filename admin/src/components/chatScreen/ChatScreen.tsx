import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useAppSelector } from "@/hooks/redux";
import { IMessageChat } from "@/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface ChatScreenProps {
  messages: IMessageChat[] | null;
}

const ChatScreen = ({ messages }: ChatScreenProps) => {
  const { user } = useAppSelector((state) => state.user);
  const { chat, loading } = useAppSelector((state) => state.chat);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 p-5 overflow-y-auto">
      {!chat || loading ? (
        <div className="w-full h-full flex justify-center items-center shadow-md">
          <div className="w-[70%] h-[70%] relative">
            <Image fill src="/assets/laptop.avif" alt="Chat image" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages?.map((msg, index) => (
            <div
              ref={index === messages.length - 1 ? scrollRef : undefined}
              key={msg._id}
            >
              <div
                className={`flex items-end gap-2  
              ${user?._id === msg.senderId ? "flex-row-reverse" : ""}`}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    fill
                    src={msg?.avatar?.url}
                    alt="Profile Picture"
                    className="object-cover"
                  />
                </div>
                <div
                  className={`max-w-[70%] flex flex-col 
                  ${user?._id === msg.senderId ? "items-end" : ""}`}
                >
                  <span
                    className={`p-3 rounded-lg  
                      ${
                        user?._id === msg.senderId
                          ? "bg-orange-200"
                          : "bg-purple-200"
                      }`}
                  >
                    {msg?.message}
                  </span>
                  <span className="text-gray-500">
                    {dayjs(msg.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
