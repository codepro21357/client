import { IChat, IMessage, IMessageChat } from "@/types";
import { AxiosInstance } from "axios";

interface IGetAllChats {
  success: boolean;
  chats: IChat[];
}

export const getAllChats = async (
  axiosPrivate: AxiosInstance,
  id: string | undefined
) => {
  const res = await axiosPrivate.get(`/api/chats/${id}`);
  return res.data as IGetAllChats;
};

interface ICreateMessage {
  axiosPrivate: AxiosInstance;
  data: IMessage;
}

interface ICreateMessageData {
  success: boolean;
  message: IMessageChat;
}

export const createMessage = async ({ axiosPrivate, data }: ICreateMessage) => {
  const res = await axiosPrivate.post("/api/messages/admin", data);
  return res.data as ICreateMessageData;
};

interface IGetUserChat {
  success: boolean;
  messages: IMessageChat[];
}

export const getUserChats = async (
  axiosPrivate: AxiosInstance,
  id: string | undefined
) => {
  const res = await axiosPrivate.get(`/api/messages/${id}`);
  return res.data as IGetUserChat;
};

interface IDeleteMessages {
  axiosPrivate: AxiosInstance;
  id: string;
}

export const deleteUserMessages = async ({
  axiosPrivate,
  id,
}: IDeleteMessages) => {
  const res = await axiosPrivate.delete(`/api/messages/${id}`);
  return res.data;
};
