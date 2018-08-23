import { Router } from 'express';
import passport from 'passport';
import passportStrategy from '../../utils/passport.utils';
import find from './middleware/find';
import findOne from './middleware/findOne';
import login from './middleware/login';
import createOne from './middleware/createOne';
import deleteOne from './middleware/deleteOne';
import updateOne from './middleware/updateOne';
import isAdmin from './middleware/isAdmin';
import findMe from './middleware/findMe';
import deleteMe from './middleware/deleteMe';
import updateMe from './middleware/updateMe';
import { cfg } from '../../utils/jwt.utils';

const router = Router();
router.use(passport.initialize());

passport.use(passportStrategy);

// Get token
router.post('/users/signup', createOne);
router.post('/users/login', login);

// users
router.get('/users', passport.authenticate('jwt', { session: false }), isAdmin, find);

// User logged in
router.get('/users/profile', passport.authenticate('jwt', cfg.jwtSession), findMe);
router.delete('/users/deleteme', passport.authenticate('jwt', cfg.jwtSession), deleteMe);
router.patch('/users/updateme', passport.authenticate('jwt', cfg.jwtSession), updateMe);

// A user
router.get('/users/:userEmail', passport.authenticate('jwt', cfg.jwtSession), isAdmin, findOne);
router.delete('/users/:userEmail', passport.authenticate('jwt', cfg.jwtSession), isAdmin, deleteOne);
router.patch('/users/:userEmail', passport.authenticate('jwt', cfg.jwtSession), isAdmin, updateOne);

export default router;
