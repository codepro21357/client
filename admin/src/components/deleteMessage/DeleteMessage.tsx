import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { clearChat, refetchChats } from "@/redux/slice/chatSlice";
import { deleteUserMessages } from "@/services/chats/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Socket } from "socket.io-client";

interface DeleteMessageProps {
  socket: Socket | null;
}

const DeleteMessage = ({ socket }: DeleteMessageProps) => {
  const { chat, refetch } = useAppSelector((state) => state.chat);
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutateAsync: deleteMessageMutation, isPending } = useMutation({
    mutationFn: deleteUserMessages,
    onSuccess: () => {
      handleSocket();
      dispatch(clearChat());
      queryClient.invalidateQueries({
        queryKey: ["allChats", refetch],
      });
    },
  });

  const handleSocket = () => {
    socket?.emit("deleteMessage", chat?.userId);
  };

  const handleDelete = async () => {
    try {
      if (chat) {
        await deleteMessageMutation({ axiosPrivate, id: chat.userId });
        dispatch(refetchChats());
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <button
      className={`${
        isPending ? "cursor-not-allowed text-red-500" : "cursor-pointer"
      }`}
      onClick={handleDelete}
      disabled={isPending}
    >
      <MdDelete size={25} />
    </button>
  );
};

export default DeleteMessage;
