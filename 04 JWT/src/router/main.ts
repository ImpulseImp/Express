import { Router } from 'express';
import { dashboard, login } from '../controllers/main';
import { authenticationMiddleware as authMiddleware } from '../middleware/auth';

const router = Router();

router.route('/login').post(login);
router.route('/dashboard').get(authMiddleware, dashboard);

export default router;
