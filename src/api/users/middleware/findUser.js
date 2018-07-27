import jwt from 'jwt-simple';
import usersServices from '../../../modules/users/services';
import cfg from './config';

export default function (req, res, next) {
  usersServices
    .findUser(req.body.email, req.body.password)
    .then(response => res.send({ token: jwt.encode(response.email, cfg.jwtSecret) }))
    .catch(err => next(err));
}
