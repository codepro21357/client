import mongoose, { InferSchemaType, Schema } from 'mongoose';

const TransactionSchema = new Schema(
  {
    user: {
      userId: { type: String, required: true },
      name: { type: String, required: true },
    },
    coinType: String,
    amount: { type: String, required: true, trim: true },
    total: { type: String, required: true, trim: true },
    walletAddress: String,
    paymentScreenshot: {
      public_id: String,
      url: String,
    },
    transactionType: { type: String, default: 'purchase' },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true },
);

export type TransactionType = InferSchemaType<
  typeof TransactionSchema
>;

const transactionModel = mongoose.model<TransactionType>(
  'Transaction',
  TransactionSchema,
);

export default transactionModel;
