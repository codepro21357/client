import jwt from 'jsonwebtoken';
import config from 'config';
import { Types } from 'mongoose';
import { IUser } from '../types';

const accessToken = config.get<string>('accessToken');
const refreshToken = config.get<string>('refreshToken');
const verifyToken = config.get<string>('verifyToken');

export interface IPayload {
  id: Types.ObjectId;
  role: string;
}

export const createToken = (payload: IPayload, tokenType: string) => {
  let tokenSecret = '';
  let expiresIn = '';

  if (tokenType === 'accessToken') {
    tokenSecret = accessToken;
    expiresIn = '15m';
  }

  if (tokenType === 'refreshToken') {
    tokenSecret = refreshToken;
    expiresIn = '3d';
  }

  if (tokenType === 'verifyToken') {
    tokenSecret = verifyToken;
    expiresIn = '5m';
  }

  const token = jwt.sign(payload, tokenSecret, { expiresIn });
  return token;
};

export const createActivationToken = (user: IUser) => {
  const activationSecret = config.get<string>('activationSecret');
  const activationCode = Math.floor(
    1000 + Math.random() * 9000,
  ).toString();
  const token = jwt.sign(
    { id: user._id, activationCode },
    activationSecret,
    {
      expiresIn: '5m',
    },
  );

  return { token, activationCode };
};
