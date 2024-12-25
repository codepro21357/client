import React from "react";
import { AiOutlineMessage } from "react-icons/ai";

interface ChatIconProps {
  setShowChat: (value: boolean) => void;
}

const ChatIcon = ({ setShowChat }: ChatIconProps) => {
  return (
    <div
      className="w-[40px] h-[40px] rounded-full fixed flex justify-center items-center
         top-[calc(100vh-100px)] right-8 z-40 animate-bounce text-white bg-purple-500 
         cursor-pointer"
      onClick={() => setShowChat(true)}
    >
      <AiOutlineMessage size={25} />
    </div>
  );
};

export default ChatIcon;
