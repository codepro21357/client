import { IChat, IMessage, IMessageChat } from "@/types";
import { AxiosInstance } from "axios";

interface ICreateMessagePayload {
  axiosPrivate: AxiosInstance;
  data: IMessage;
}

interface ICreateMessageData {
  success: boolean;
  data: {
    message: IMessageChat;
    chat: IChat;
  };
}

export const createMessage = async ({
  axiosPrivate,
  data,
}: ICreateMessagePayload) => {
  const res = await axiosPrivate.post("/api/messages/", data);
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
