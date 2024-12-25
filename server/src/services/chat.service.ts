import Chat, { ChatType } from '../models/chat.model';
import ErrorHandler from '../utils/errorHandler.utils';

// GET ALL CHATS
export const getAllChats = async () => {
  const chats = await Chat.find({}).sort({
    createdAt: -1,
  });

  return chats;
};
