import { Router } from 'express';
import userRouter from '../modules/users/index';

const router = Router();

router.use(userRouter);

export default router;
