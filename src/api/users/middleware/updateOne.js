import usersServices from '../../../modules/users/services';

export default function (req, res, next) {
  usersServices
    .updateOne(req.params.userEmail, req.body)
    .then(response => res.send(response))
    .catch(err => next(err));
}
