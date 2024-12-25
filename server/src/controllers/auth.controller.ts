import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { CreateUserType } from '../schema/user.schema';
import logger from '../utils/logger.utils';

import {
  createUser,
  deleteAccount,
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
  socialAuth,
} from '../services/auth.service';
import { createToken } from '../utils/token.utils';
import { IActionRequest } from '../types';
import ErrorHandler from '../utils/errorHandler.utils';
import { updateUser } from '../services/user.service';
import axios from 'axios';
import nodemailer, { Transporter } from 'nodemailer';

const refreshTokenMaxAge = 3 * 24 * 60 * 60 * 1000;
const accessTokenMaxAge = 15 * 60 * 1000;
const refreshTokenSecret = config.get<string>('refreshToken');
const accessTokenSecret = config.get<string>('accessToken');
const verifyToken = config.get<string>('verifyToken');
const activationSecret = config.get<string>('activationSecret');

interface ICreateUser extends CreateUserType {
  captcha: string | null;
}

export const createUserHandler = async (
  req: Request<{}, {}, ICreateUser>,
  res: Response,
  next: NextFunction,
) => {
  console.log('Register request made!');

  try {
    const { captcha, ...otherInfo } = req.body;

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captcha}`,
    );

    if (!response.data.success) {
      logger.error('Failed recaptcha!');
      throw new ErrorHandler(
        'Failed to validate reCAPTCHA. Please try again.',
        400,
      );
    }

    const user = await createUser(otherInfo);
    const payload = { id: user._id, role: user.role };
    const accessToken = createToken(payload, 'accessToken');
    const refreshToken = createToken(payload, 'refreshToken');
    const newUser = await updateUser(user._id, {
      token: refreshToken,
    });
    const { password, token, ...others } = newUser.toJSON();
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: refreshTokenMaxAge,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: accessTokenMaxAge,
    });
    res
      .status(201)
      .json({ success: true, user: others, token: accessToken });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

type DecodedType = {
  id: string;
  activationCode: string;
};

export const activateUserHandler = async (
  req: Request<{}, {}, IActionRequest>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { activation_token, activation_code } = req.body;
    const decoded = jwt.verify(activation_token, activationSecret);

    if (!decoded) {
      const error = new ErrorHandler('Expired code', 401);
      return next(error);
    }

    const { id, activationCode } = decoded as DecodedType;

    if (activationCode === activation_code) {
      const user = await updateUser(id, {
        isVerified: true,
      });

      res.status(200).json({ success: true, user });
    } else {
      const error = new ErrorHandler('Invalid activation code', 401);
      next(error);
    }
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const forgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    const user = await forgotPassword(email);
    const payload = { id: user._id, role: user.role };
    const token = createToken(payload, 'verifyToken');
    const clientUrl = config.get<string>('clientUrl');

    //Link
    const link = `Click on this link to reset your password ${clientUrl}/reset-password/${token}`;

    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!),
      secure: true,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: 'Password Reset',
      html: link,
    };

    transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, verifyToken) as jwt.JwtPayload;

    if (!decoded) {
      const error = new ErrorHandler('Expired link', 403);
      throw error;
    }

    const { id } = decoded;
    const user = await resetPassword(password, id);

    res.status(200).json({ success: true, user });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await loginUser(req.body);

    const payload = { id: user._id, role: user.role };
    const accessToken = createToken(payload, 'accessToken');
    const refreshToken = createToken(payload, 'refreshToken');

    const newUser = await updateUser(user._id, {
      token: refreshToken,
    });

    const { password, token, ...others } = newUser.toJSON();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: refreshTokenMaxAge,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: accessTokenMaxAge,
    });
    res
      .status(200)
      .json({ success: true, user: others, token: accessToken });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const logoutUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    await logoutUser(id);

    res.cookie('refreshToken', '', { maxAge: 1 });
    res.cookie('accessToken', '', { maxAge: 1 });
    res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const updateAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const error = new ErrorHandler('Not authenticated', 401);
      throw error;
    }
    const decoded = jwt.verify(
      refreshToken,
      refreshTokenSecret,
    ) as jwt.JwtPayload;

    if (!decoded) {
      const error = new ErrorHandler('Invalid token', 403);
      throw error;
    }

    req.user = decoded;
    const payload = { id: decoded.id, role: decoded.role };
    const accessToken = createToken(payload, 'accessToken');

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: accessTokenMaxAge,
    });
    res.status(200).json({ success: true, token: accessToken });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export const socialAuthHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, message } = await socialAuth(req.body);
    let statusCode;

    if (message === 'social-auth-register') {
      statusCode = 201;
    } else {
      statusCode = 200;
    }

    const payload = { id: user._id, role: user.role };
    const accessToken = createToken(payload, 'accessToken');
    const refreshToken = createToken(payload, 'refreshToken');

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: refreshTokenMaxAge,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: accessTokenMaxAge,
    });
    res
      .status(statusCode)
      .json({ success: true, user, token: accessToken });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

//DELETE ACCOUNT HANDLER
export const deleteAccountHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await deleteAccount(id);

    res.cookie('refreshToken', '', { maxAge: 1 });
    res.cookie('accessToken', '', { maxAge: 1 });
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
