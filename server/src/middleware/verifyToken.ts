import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import logger from '../utils/logger.utils';

const accessTokenSec = config.get<string>('accessToken');

export const verifyToken = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    const authHeader =
      req.headers.authorization ||
      (req.headers.Authorization as string);

    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authenticated' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      accessTokenSec,
    ) as jwt.JwtPayload;

    if (!decoded) {
      return res
        .status(403)
        .json({ success: false, message: 'Invalid token' });
    }

    req.user = decoded;

    next();
  } catch (err: any) {
    logger.error(err);
    if (err.name === 'JsonWebTokenError') {
      return res
        .status(403)
        .json({ success: false, message: 'Invalid token' });
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({
        success: false,
        message: 'JWT token has expired. Please try again!',
      });
    }

    res
      .status(500)
      .json({ success: false, message: 'Internal Server error' });
  }
};

export const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  verifyToken(req, res, () => {
    if (
      req.user.id.toString() === req.params.id ||
      req.user.role === 'admin'
    ) {
      return next();
    }

    return res
      .status(403)
      .json({ success: false, message: 'Not authorized' });
  });
};

export const verifyTokenAndAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  verifyToken(req, res, () => {
    console.log('Checking admin...', req.user);

    if (req.user.role === 'admin') {
      console.log('Is admin...');
      return next();
    }
    return res
      .status(403)
      .json({ success: false, message: 'Not authorized' });
  });
};
