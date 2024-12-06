import { useAppSelector } from "@/hooks/redux";
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
  const { chat, loading } = useAppSelector((state) => state.chat);

  return (
    <div className="h-20 px-5 flex items-center bg-orange-100">
      {chat && !loading && (
        <form onSubmit={handleSubmit} className="flex-1 flex gap-5">
          <input
            type="text"
            placeholder="Write Something..."
            value={message}
            className="flex-1 p-3 rounded-full"
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className={`w-[40px] h-[40px] rounded-full flex justify-center items-center 
            cursor-pointer transition-all duration-300 text-white ${
              isPending
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-400"
            }`}
            disabled={isPending}
          >
            <IoSendSharp size={25} />
          </button>
        </form>
      )}
    </div>
  );
};

export default ChatForm;
