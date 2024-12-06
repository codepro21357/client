import React from "react";
import { FaCheck } from "react-icons/fa";

const Notification = ({ message }: { message: string }) => {
  return (
    <div
      className="px-5 py-4 relative flex items-center gap-4 bg-white shadow-xl 
      before:content-[''] before:w-2 before:h-full before:absolute before:top-0 before:left-0 
      before:bg-green-500"
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center 
        text-white bg-green-500"
      >
        <FaCheck size={12} />
      </div>
      <div>
        <h3 className="font-bold capitalize">One new message</h3>
        <p className="flex italic">
          Customer Service:{" "}
          {message?.length > 23 ? (
            <>
              <span>{message?.substring(0, 23)}</span>
              <span>...</span>
            </>
          ) : (
            message
          )}
        </p>
      </div>
    </div>
  );
};

export default Notification;
