import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.utils';
import { MessageType } from '../models/message.model';
import {
  createAdminMessage,
  createMessage,
  deleteUserMessages,
  getUserMessages,
} from '../services/message.service';

// CREATE MESSAGE HANDLER
export const createMessageHandler = async (
  req: Request<{}, {}, MessageType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await createMessage(req.body);
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

// CREATE ADMIN MESSAGE HANDLER
export const createAdminMessageHandler = async (
  req: Request<{}, {}, MessageType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const message = await createAdminMessage(req.body);
    res.status(201).json({ success: true, message });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

// GET USER MESSAGES HANDLER
export const getUserMessagesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { chatId } = req.params;
    const messages = await getUserMessages(chatId);

    res.status(200).json({ success: true, messages });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

// DELETE USER MESSAGES HANDLER
export const deleteUserMessagesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { chatId } = req.params;
    const messages = await deleteUserMessages(chatId);

    res.sendStatus(204);
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};
