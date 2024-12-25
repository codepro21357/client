import { Router } from 'express';
import {
  createTransactionHandler,
  deleteTransactionHandler,
  getAllTransactionsHandler,
  getTransactionHandler,
  getUserTransactionsHandler,
  updateTransactionHandler,
} from '../controllers/transaction.controller';
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middleware/verifyToken';
const router = Router();

// GET ALL TRANSACTIONS
router.get('/', verifyTokenAndAdmin, getAllTransactionsHandler);

// CREATE TRANSACTION
router.post(
  '/:id',
  verifyTokenAndAuthorization,
  createTransactionHandler,
);
// GET TRANSACTIONS
router.get(
  '/details/:id',
  verifyTokenAndAdmin,
  getTransactionHandler,
);

// GET SINGLE USER TRANSACTIONS
router.get(
  '/:id',
  verifyTokenAndAuthorization,
  getUserTransactionsHandler,
);

// UPDATE TRANSACTIONS
router.put(
  '/:id',
  verifyTokenAndAuthorization,
  updateTransactionHandler,
);

// DELETE TRANSACTION
router.delete('/:id', verifyTokenAndAdmin, deleteTransactionHandler);

export default router;
