import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.utils';
import {
  createNewsletter,
  deleteNewsletter,
  getAllNewsletters,
} from '../services/newsletter';

// CREATE NEWSLETTER HANDLER
export const createNewsletterHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newsletter = await createNewsletter(req.body);
    res.status(201).json({ success: true, newsletter });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// GET ALL NEWSLETTER
export const getAllNewslettersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newsletters = await getAllNewsletters();
    res.status(200).json({ success: true, newsletters });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
// DELETE NEWSLETTER
export const deleteNewsletterHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await deleteNewsletter(id);
    console.log('Newsletter deleted successfully!');
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
