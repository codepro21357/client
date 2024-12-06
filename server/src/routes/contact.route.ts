import { Router } from 'express';
import { sendContactHandler } from '../controllers/contact.controller';
import validateResource from '../middleware/validateResource';
import { contactSchema } from '../schema/contact.schema';

const router = Router();

// CONTACT ROUTE
router.post('/', validateResource(contactSchema), sendContactHandler);

export default router;
