import { Router } from 'express';
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middleware/verifyToken';
import { getAllChatsHandler } from '../controllers/chat.controller';

const router = Router();

// GET ALL CHATS
router.get('/:id', verifyTokenAndAdmin, getAllChatsHandler);

export default router;
