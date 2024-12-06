import { Router } from 'express';
import {
  getOverviewHandler,
  getSalesHandler,
} from '../controllers/overview.controller';
import { verifyTokenAndAdmin } from '../middleware/verifyToken';

const router = Router();

// GET OVERVIEW ROUTE
router.get('/', verifyTokenAndAdmin, getOverviewHandler);

// GET SALES ROUTE
router.get('/sales', verifyTokenAndAdmin, getSalesHandler);

export default router;
