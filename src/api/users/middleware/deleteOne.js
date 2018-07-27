import usersServices from '../../../modules/users/services';

export default function (req, res, next) {
  return usersServices
    .deleteOne(req.params.email)
    .then(response => res.send(response))
    .catch(err => next(err));
}
