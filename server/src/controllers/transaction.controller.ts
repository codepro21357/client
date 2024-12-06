import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.utils';
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransaction,
  getUserTransactions,
  updateTransaction,
} from '../services/transaction.service';
import { ICreateTransaction } from '../types';
import ErrorHandler from '../utils/errorHandler.utils';

// CREATE TRANSACTION HANDLER
export const createTransactionHandler = async (
  req: Request<{}, {}, ICreateTransaction>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const transaction = await createTransaction(req.body);
    res.status(201).json({ success: true, transaction });
  } catch (err: any) {
    logger.error(err);

    if (err?.message?.includes('Transaction validation failed')) {
      const error = new ErrorHandler('Validation failed!', 400);
      next(error);
    } else {
      next(err);
    }
  }
};

// GET TRANSACTION HANDLER
export const getTransactionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const transaction = await getTransaction(id);

    res.status(200).json({ success: true, transaction });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

// GET SINGLE USER TRANSACTIONS HANDLER
export const getUserTransactionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const transactions = await getUserTransactions(id);

    res.status(200).json({ success: true, transactions });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

// GET ALL TRANSACTIONS HANDLER
export const getAllTransactionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const transactions = await getAllTransactions();

    res.status(200).json({ success: true, transactions });
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

// UPDATE TRANSACTION HANDLER
export const updateTransactionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const transaction = await updateTransaction(id, req.body);

    res.status(200).json({ success: true, transaction });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

//DELETE TRANSACTION HANDLER
export const deleteTransactionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await deleteTransaction(id);
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
