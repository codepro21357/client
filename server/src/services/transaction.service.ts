import Transaction from '../models/transaction.model';
import { ICreateTransaction } from '../types';
import ErrorHandler from '../utils/errorHandler.utils';
import { v2 as cloudinary } from 'cloudinary';

// CREATE TRANSACTION
export const createTransaction = async (
  input: ICreateTransaction,
) => {
  if (input?.paymentScreenshot) {
    const uploadResult = await cloudinary.uploader.upload(
      input.paymentScreenshot,
      {
        folder: 'transaction',
      },
    );

    const { paymentScreenshot, ...otherData } = input;

    const data = {
      ...otherData,
      paymentScreenshot: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    };

    return await Transaction.create(data);
  }

  const updatedData = { ...input, transactionType: 'withdraw' };
  return await Transaction.create(updatedData);
};

// GET USER TRANSACTIONS
export const getUserTransactions = async (id: string) => {
  const transactions = await Transaction.find({
    'user.userId': id,
  });

  return transactions;
};

// GET USER TRANSACTIONS
export const getTransaction = async (id: string) => {
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    throw new ErrorHandler('Transaction not found', 404);
  }

  return transaction;
};

// GET ALL TRANSACTIONS
export const getAllTransactions = async () => {
  const transactions = await Transaction.find({}).sort({
    createdAt: -1,
  });

  return transactions;
};

// UPDATE TRANSACTION
interface IUpdatePayload {
  status: string;
}

export const updateTransaction = async (
  id: string,
  payload: IUpdatePayload,
) => {
  const transaction = await Transaction.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true },
  );

  if (!transaction) {
    throw new ErrorHandler('Transaction ID does not exist', 404);
  }

  return transaction;
};

// DELETE TRANSACTION
export const deleteTransaction = async (id: string) => {
  const transaction = await Transaction.findByIdAndDelete(id);

  if (!transaction) {
    throw new ErrorHandler('Transaction not found', 404);
  }

  if (transaction.transactionType === 'purchase') {
    await cloudinary.uploader.destroy(
      transaction?.paymentScreenshot?.public_id ?? '',
    );
  }

  return transaction;
};
