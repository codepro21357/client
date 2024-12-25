import mongoose from 'mongoose';

export interface IParams {
  id: string;
}

export interface IActionRequest {
  activation_token: string;
  activation_code: string;
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  country: string;
  email: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role: string;
  token: string;
  isVerified: boolean;
}

export interface ICreateTransaction {
  user: {
    userId: string;
    name: string;
  };
  coinType?: string;
  amount: string;
  total: string;
  accountNumber?: string;
  routingNumber?: string;
  paymentScreenshot?: string;
}

export interface INewsletterRequestBody {
  email: string;
}
