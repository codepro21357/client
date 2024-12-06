export interface ISocketUser {
  userId: string;
  userRole: string;
  socketId: string;
}

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
  accountNumber?: string;
  routingNumber?: string;
  user: { userId: string; name: string };
  paymentScreenshot?: { public_id: string; url: string };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICoinDetails {
  uuid: string;
  dailyVolume: string;
  btcPrice: string;
  change: string;
  coinrankingUrl: string;
  color: string;
  contractAddresses: Array<any>;
  iconUrl: string;
  listedAt: number;
  lowVolume: boolean;
  marketCap: string;
  name: string;
  price: string;
  rank: number;
  sparkline: Array<string>;
  symbol: string;
  tier: number;
}

interface ISupply {
  circulating: string;
  confirmed: boolean;
  max: string;
  supplyAt: number;
  total: string;
}

export interface ICryptoDetails {
  uuid: string;
  dailyVolume: string;
  btcPrice: string;
  change: string;
  coinrankingUrl: string;
  color: string;
  contractAddresses: Array<any>;
  iconUrl: string;
  listedAt: number;
  lowVolume: boolean;
  marketCap: string;
  name: string;
  price: string;
  rank: number;
  sparkline: Array<string>;
  symbol: string;
  tier: number;
  numberOfMarkets: number;
  numberOfExchanges: number;
  supply: ISupply;
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
