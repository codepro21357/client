import mongoose from 'mongoose';
import User from '../models/user.model';
import { CreateUserType } from '../schema/user.schema';
import comparePasswords from '../utils/comparePasswords.utils';
import ErrorHandler from '../utils/errorHandler.utils';

import { v2 as cloudinary } from 'cloudinary';
import Message from '../models/message.model';

export const createUser = async (input: CreateUserType) => {
  const user = await User.findOne({ email: input.email });

  if (user) {
    throw new ErrorHandler('Email has been used', 400);
  }

  const uploadResult = await cloudinary.uploader.upload(
    input.avatar,
    {
      folder: 'profile',
    },
  );

  const { avatar, ...otherData } = input;

  const data = {
    ...otherData,
    avatar: {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    },
  };

  return await User.create(data);
};

interface ILogin {
  email: string;
  password: string;
}

export const loginUser = async (input: ILogin) => {
  const user = await User.findOne({ email: input.email });

  if (!user) {
    const error = new ErrorHandler('Invalid email or password', 401);
    throw error;
  }

  const isMatch = await comparePasswords({
    inputPassword: input.password,
    userPassword: user?.password || '',
  });

  if (!isMatch) {
    const error = new ErrorHandler('Invalid email or password', 401);
    throw error;
  }

  return user;
};

export const forgotPassword = async (email: string) => {
  if (!email) {
    const error = new ErrorHandler('Email is required!', 400);
    throw error;
  }

  const user = await User.findOne({ email });

  if (!user) {
    const error = new ErrorHandler('user not found!', 404);
    throw error;
  }

  return user;
};

export const resetPassword = async (password: string, id: string) => {
  if (!password) {
    const error = new ErrorHandler('Password is required!', 400);
    throw error;
  }

  const user = await User.findById(id);

  if (!user) {
    const error = new ErrorHandler('user not found!', 404);
    throw error;
  }

  user.password = password;
  await user.save();

  return user;
};

export const logoutUser = async (id: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { token: '' } },
    { new: true },
  );

  if (!user) {
    throw new ErrorHandler('User ID does not exist', 404);
  }
};

export const socialAuth = async (input: CreateUserType) => {
  const user = await User.findOne({ email: input.email });

  if (user) {
    return { user, message: 'social-auth-login' };
  } else {
    const newUser = await User.create(input);
    return { user: newUser, message: 'social-auth-register' };
  }
};

//UPDATE TOKEN
export const updateToken = async (
  id: mongoose.Types.ObjectId,
  token: string,
) => {
  const user = await User.findByIdAndUpdate(
    id,
    { token },
    { new: true },
  );

  if (!user) {
    const error = new ErrorHandler('No user found!', 404);
    throw error;
  }

  return user;
};

// DELETE ACCOUNT
export const deleteAccount = async (id: string) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ErrorHandler('User not found', 404);
  }

  if (user.avatar?.public_id) {
    await Promise.all([
      cloudinary.uploader.destroy(user.avatar?.public_id),
      Message.deleteMany({ senderId: user?._id }),
    ]);
  } else {
    await Message.deleteMany({ senderId: user?._id });
  }

  return user;
};
