import jwt from 'jwt-simple';
import usersServices from '../../../modules/users/services';
import cfg from './config';

export default function (req, res, next) {
  usersServices
    .findUser(req.body.email, req.body.password)
    .then((response) => { return { email: response.email, password: req.body.password }; })
    .then(payload => res.send({ token: jwt.encode(payload, cfg.jwtSecret) }))
    .catch(err => next(err));
}
