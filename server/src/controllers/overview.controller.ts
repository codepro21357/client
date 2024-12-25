import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.utils';
import { getOverview, getSales } from '../services/overview.service';

export const getOverviewHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const overview = await getOverview();

    res.status(200).json({ success: true, overview });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

// GET SALES HANDLER
export const getSalesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getSales();
    res.status(200).json({ success: true, data });
  } catch (err) {
    logger.error(err);
    next(err);
  }
};
