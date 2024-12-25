import { Router } from 'express';
import validateResource from '../middleware/validateResource';
import {
  activateUserHandler,
  createUserHandler,
  deleteAccountHandler,
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  resetPasswordHandler,
  socialAuthHandler,
  updateAccessTokenHandler,
} from '../controllers/auth.controller';
import {
  createUserSchema,
  loginUserSchema,
  socialAuthSchema,
} from '../schema/user.schema';
import { activateUserSchema } from '../schema/activate.schema';
import { verifyTokenAndAuthorization } from '../middleware/verifyToken';

const router = Router();

router.post(
  '/register',
  validateResource(createUserSchema),
  createUserHandler,
);
router.post(
  '/login',
  validateResource(loginUserSchema),
  loginUserHandler,
);
router.delete('/logout/:id', logoutUserHandler);
router.post(
  '/activate-user',
  validateResource(activateUserSchema),
  activateUserHandler,
);
router.get('/refresh', updateAccessTokenHandler);
router.post('/forgot-password', forgotPasswordHandler);
router.post('/reset-password/:token', resetPasswordHandler);
router.post(
  '/social-auth',
  validateResource(socialAuthSchema),
  socialAuthHandler,
);

// DELETE ACCOUNT
router.delete(
  '/accounts/:id',
  verifyTokenAndAuthorization,
  deleteAccountHandler,
);

export default router;
