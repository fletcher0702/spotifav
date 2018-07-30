import { Router } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import find from './middleware/find';
import findOne from './middleware/findOne';
import findUser from './middleware/findUser';
import createOne from './middleware/createOne';
import deleteOne from './middleware/deleteOne';
import updateOne from './middleware/updateOne';
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
    .findOne(payload)
    .then(user => done(null, user))
    .catch(err => done(err, null));
}));
passport.use(strategy);

// users
router.get('/users', passport.authenticate('jwt', { session: false }), find);


// A list
router.get('/users/:userEmail', passport.authenticate('jwt', cfg.jwtSession), findOne);
router.delete('/users/:userEmail', deleteOne);
router.patch('/users/:userEmail', updateOne);

// Get token
router.post('/users/signup', createOne);
router.post('/users/login', findUser);
export default router;
