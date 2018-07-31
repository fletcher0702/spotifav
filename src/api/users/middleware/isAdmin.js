import usersServices from '../../../modules/users/services';

export default function (req, res, next) {
  usersServices
    .isAdmin(req.user.email)
    .then(() => next())
    .catch(err => next(err));
}
