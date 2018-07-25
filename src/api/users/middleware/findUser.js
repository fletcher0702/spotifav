import jwt from 'jwt-simple';
import listsServices from '../../../modules/users/services';
import cfg from './config';

export default function (req, res, next) {
  listsServices
    .findUser(req.body.email, req.body.password)
    .then(response => res.send({ token: jwt.encode(response._id, cfg.jwtSecret) }))
    .catch(err => next(err));
}
