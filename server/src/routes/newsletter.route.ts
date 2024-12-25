import { Router } from 'express';
import {
  createNewsletterHandler,
  deleteNewsletterHandler,
  getAllNewslettersHandler,
} from '../controllers/newsletter.controllers';
import { verifyTokenAndAdmin } from '../middleware/verifyToken';

const router = Router();

// CREATE NEWSLETTER
router.post('/', createNewsletterHandler);
//GET ALL NEWSLETTERS
router.get('/', verifyTokenAndAdmin, getAllNewslettersHandler);
// DELETE NEWSLETTER
router.delete('/:id', verifyTokenAndAdmin, deleteNewsletterHandler);

export default router;
