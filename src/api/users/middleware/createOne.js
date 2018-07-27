import jwt from 'jwt-simple';
import usersServices from '../../../modules/users/services';
import cfg from './config';

export default function (req, res, next) {
  req.body.isAdmin = false;
  return usersServices
    .createOne(req.body)
    .then(response => res.send({ token: jwt.encode(response._id, cfg.jwtSecret) }))
    .catch(err => next(err));
}
