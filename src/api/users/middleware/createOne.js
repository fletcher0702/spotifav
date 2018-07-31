import jwt from 'jwt-simple';
import usersServices from '../../../modules/users/services';
import cfg from './config';

export default function (req, res, next) {
  req.body.isAdmin = true;
  return usersServices
    .createOne(req.body)
    .then(response => res.send({
      token: jwt.encode({ email: response.email, password: response.password }, cfg.jwtSecret),
    }))
    .catch(err => next(err));
}
