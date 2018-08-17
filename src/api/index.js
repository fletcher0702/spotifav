import { Router } from 'express';
import setHeaders from './middleware/setHeaders';
import userRouter from './users';
import albumRouter from './albums';

const router = Router();

router.use(setHeaders);

router.use(userRouter);
router.use(albumRouter);

export default router;
