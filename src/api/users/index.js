import { Router } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import find from './middleware/find';
import findOne from './middleware/findOne';
import findUser from './middleware/findUser';
import createOne from './middleware/createOne';
import deleteOne from './middleware/deleteOne';
import updateOne from './middleware/updateOne';
import isAdmin from './middleware/isAdmin';
import findMe from './middleware/findMe';
import deleteMe from './middleware/deleteMe';
import updateMe from './middleware/updateMe';
import listsServices from '../../modules/users/services';
import cfg from './middleware/config';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'MyS3cr3tK3Y',
};

const router = Router();
router.use(passport.initialize());

const strategy = new Strategy(opts, ((payload, done) => {
  listsServices
    .findUser(payload.email, payload.password)
    .then(user => done(null, user))
    .catch(err => done(err, null));
}));
passport.use(strategy);

// Get token
router.post('/users/signup', createOne);
router.post('/users/login', findUser);

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
