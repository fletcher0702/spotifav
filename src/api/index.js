import { Router } from 'express';
import setHeaders from './middleware/setHeaders';
import userRouter from './users';

const router = Router();

router.use(setHeaders);

router.use(userRouter);

export default router;
