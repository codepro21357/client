"use client";

import React, { useRef } from "react";
import Chat from "@/components/chat/Chat";
import ChatList from "@/components/chatList/ChatList";

const Chats = () => {
  return (
    <section className="w-full h-[calc(100vh-40px)] md:px-5 md:py-7 flex bg-white">
      <div className="flex-1 flex md:rounded-xl overflow-hidden shadow-lg shadow-gray-400">
        <ChatList />
        <Chat />
      </div>
    </section>
  );
};

export default Chats;
