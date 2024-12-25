import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import User from '../models/user.model';
import ErrorHandler from '../utils/errorHandler.utils';
import comparePasswords from '../utils/comparePasswords.utils';

// GET USER
export const getUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ErrorHandler('User not found', 404);
  }

  return user;
};

// GET ALL USERS
export const getAllUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 });

  return users;
};

// UPDATE USER
type UserIdType = string | mongoose.Types.ObjectId;
interface IUpdateUser {
  balance?: string;
  equity?: string;
  openPl?: string;
  closePl?: string;
  freeMargin?: string;
  marginLevel?: string;
  credit?: string;
  token?: string;
  isVerified?: boolean;
}

export const updateUser = async (
  id: UserIdType,
  payload: IUpdateUser,
) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true },
  );

  if (!user) {
    throw new ErrorHandler('User ID does not exist', 404);
  }

  return user;
};

// UPDATE USER PASSWORD
interface IUpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const updateUserPassword = async (
  id: string,
  payload: IUpdatePasswordPayload,
) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ErrorHandler('User ID does not exist', 404);
  }

  const isMatch = await comparePasswords({
    inputPassword: payload.oldPassword,
    userPassword: user.password || '',
  });

  if (!isMatch) {
    throw new ErrorHandler('Old password is incorrect', 401);
  }

  user.password = payload.newPassword;
  const newUser = await user.save();

  return newUser;
};

interface IUpdateProfilePicture {
  id: string;
  avatar: string;
}

// UPDATE PROFILE PICTURE
export const updateProfilePicture = async ({
  id,
  avatar,
}: IUpdateProfilePicture) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ErrorHandler('User not found', 404);
  }

  if (user?.avatar?.public_id) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: 'avatars',
      width: 150,
    });

    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  } else {
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: 'avatars',
      width: 150,
    });

    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await user.save();

  return user;
};

// UPDATE USER ROLE
interface IUpdateUserRole {
  id: string;
  role: string;
}

export const updateUserRole = async ({
  id,
  role,
}: IUpdateUserRole) => {
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true },
  );

  if (!user) {
    throw new ErrorHandler('User not found', 404);
  }

  return user;
};

// DELETE USER
export const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ErrorHandler('User not found', 404);
  }

  if (user.avatar?.public_id) {
    await cloudinary.v2.uploader.destroy(user.avatar?.public_id);
  }

  return user;
};

//USERS ANALYTICS
export const getUserAnalytics = async () => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const data = await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: lastYear,
        },
      },
    },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return data;
};
