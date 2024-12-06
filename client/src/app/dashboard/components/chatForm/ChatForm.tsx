import React from "react";
import { IoSendSharp } from "react-icons/io5";

interface ChatFormProps {
  isPending: boolean;
  message: string;
  setMessage: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatForm = ({
  isPending,
  message,
  setMessage,
  handleSubmit,
}: ChatFormProps) => {
  return (
    <div className="p-5 bg-purple-100">
      <form onSubmit={handleSubmit} className="flex gap-5">
        <input
          type="text"
          placeholder="Write Something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded-full"
        />
        <button
          className={`w-[40px] h-[40px] rounded-full flex justify-center items-center 
          cursor-pointer transition-all duration-300 text-white ${
            isPending
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-400"
          }`}
          disabled={isPending}
        >
          <IoSendSharp size={25} />
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
