export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  country: string;
  balance: string;
  closePl: string;
  openPl: string;
  marginLevel: string;
  freeMargin: string;
  equity: string;
  credit: string;
  avatar: {
    public_id: string;
    url: string;
  };
  agreement: boolean;
  isVerified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransaction {
  _id: string;
  amount: string;
  total: string;
  coinType?: string;
  status: string;
  transactionType: string;
  walletAddress?: string;
  user: { userId: string; name: string };
  paymentScreenshot?: { public_id: string; url: string };
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetUserStats {
  success: boolean;
  data: { _id: number; total: number }[];
}

export interface IOverview {
  id: number;
  title: string;
  value: number | string;
}

export interface INewsletter {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChat {
  _id: string;
  userId: string;
  name: string;
  lastMessage: string;
  avatar: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  senderId: string;
  chatId: string;
  name: string;
  message: string;
  avatar: {
    public_id: string;
    url: string;
  };
}

export interface IMessageChat extends IMessage {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
