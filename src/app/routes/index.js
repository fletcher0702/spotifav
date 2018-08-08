import { Router } from 'express';
import userRouter from './users/index';

const router = Router();

router.use(userRouter);

export default router;
