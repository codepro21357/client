import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
import logger from '../utils/logger.utils';

interface IParams {
  id: string;
}

const validateResource =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e: any) {
      logger.error(e);

      const message = 'Validation error';
      res
        .status(400)
        .json({ success: false, message, errors: e.errors });
    }
  };

export default validateResource;
