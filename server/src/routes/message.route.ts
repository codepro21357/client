import { Router } from 'express';
import {
  createAdminMessageHandler,
  createMessageHandler,
  deleteUserMessagesHandler,
  getUserMessagesHandler,
} from '../controllers/message.controller';

const router = Router();

// GET USER MESSAGES
router.get('/:chatId', getUserMessagesHandler);

// CREATE MESSAGE
router.post('/', createMessageHandler);

// CREATE ADMIN MESSAGE
router.post('/admin', createAdminMessageHandler);

// DELETE USER MESSAGES
router.delete('/:chatId', deleteUserMessagesHandler);

export default router;
