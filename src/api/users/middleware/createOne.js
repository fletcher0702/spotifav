import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import usersServices from '../../../modules/users/services';
import cfg from './config';

export default function (req, res, next) {
  req.body.isAdmin = true;
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  return usersServices
    .createOne(req.body)
    .then(response => res.send({ token: jwt.encode(response.email, cfg.jwtSecret) }))
    .catch(err => next(err));
}
