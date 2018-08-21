import { ExtractJwt, Strategy } from 'passport-jwt';
import userServices from '../modules/users/services';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'MyS3cr3tK3Y',
};
const strategy = new Strategy(opts, ((payload, done) => {
  userServices
    .findOneById(payload.userId)
    .then((user) => {
      if (user === null) {
        done(null, false);
      }
      done(null, payload);
    })
    .catch(err => console.log(err));
}));

export default strategy;
