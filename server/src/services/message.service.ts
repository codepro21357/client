import Chat from '../models/chat.model';
import Message, { MessageType } from '../models/message.model';
import ErrorHandler from '../utils/errorHandler.utils';

// CREATE MESSAGE
export const createMessage = async (input: MessageType) => {
  const userChat = await Chat.findOne({ userId: input.senderId });

  if (userChat) {
    userChat.lastMessage = input.message;

    const [chat, message] = await Promise.all([
      userChat.save(),
      Message.create(input),
    ]);

    return { chat, message };
  } else {
    const chatData = {
      userId: input.senderId,
      name: input.name,
      lastMessage: input.message,
      avatar: input.avatar,
    };

    const [chat, message] = await Promise.all([
      Chat.create(chatData),
      Message.create(input),
    ]);

    return { chat, message };
  }
};

// CREATE ADMIN MESSAGE
export const createAdminMessage = async (input: MessageType) => {
  const message = await Message.create(input);
  return message;
};

// GET USER MESSAGES
export const getUserMessages = async (chatId: string) => {
  const chats = await Message.find({ chatId }).sort({
    createdAt: 1,
  });

  return chats;
};

// DELETE USER MESSAGES
export const deleteUserMessages = async (chatId: string) => {
  const [deleteChatResult, deleteMessageResult] = await Promise.all([
    Chat.deleteOne({ userId: chatId }),
    Message.deleteMany({ chatId }),
  ]);

  return { deleteChatResult, deleteMessageResult };
};
