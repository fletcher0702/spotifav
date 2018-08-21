/* eslint-disable no-param-reassign */
import usersServices from '../../../modules/users/services';

export default function getUsers(req, res, next) {
  const {
    first,
    offset,
  } = req.query;

  let limit = 20;
  let offsetValue = 0;
  if (typeof first !== 'undefined') {
    if (parseInt(first, 10).toString() !== 'NaN') {
      limit = parseInt(first, 10);
    }
  }

  if (typeof offset !== 'undefined') {
    if (parseInt(offset, 10).toString() !== 'NaN') {
      offsetValue = parseInt(offset, 10);
    }
  }
  return usersServices
    .find(limit, offsetValue)
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
