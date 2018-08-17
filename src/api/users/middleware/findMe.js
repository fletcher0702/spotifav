import usersServices from '../../../modules/users/services';

export default function (req, res, next) {
  usersServices
    .findOneById(req.user.userId)
    .then((response) => {
      delete response.password;
      res.status(201).json(response);
    })
    .catch(err => next(err));
}
