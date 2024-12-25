import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.utils';
import { ChatType } from '../models/chat.model';
import { getAllChats } from '../services/chat.service';

// GET ALL CHATS HANDLER
export const getAllChatsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chats = await getAllChats();

    res.status(200).json({ success: true, chats });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};
