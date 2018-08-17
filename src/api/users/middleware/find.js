import usersServices from '../../../modules/users/services';

export default function getUsers(req, res, next) {
  const {
    first,
    offset,
  } = req.query;

  // parseInt(first, 10), parseInt(offset, 10)
  return usersServices
    .find()
    .then((response) => {
      const users = [];

      response.forEach((element) => {
        delete element.password;
        users.push(element);
      });
      res.send(users);
    })
    .catch(err => next(err));
}
