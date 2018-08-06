import { Router } from 'express';

import find from './middleware/find';
import findOne from './middleware/findOne';
import createOne from './middleware/createOne';
import deleteOne from './middleware/deleteOne';
import updateOne from './middleware/updateOne';

const router = Router();

// users
router.get('/users', find);
router.post('/users', createOne);

// A list
router.get('/users/:id', findOne);
router.delete('/users/:id', deleteOne);
router.patch('/users/:id', updateOne);


export default router;
