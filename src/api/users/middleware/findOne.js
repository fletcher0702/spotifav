/* eslint-disable no-param-reassign,consistent-return */
import usersServices from '../../../modules/users/services';

export default function (req, res, next) {
  const mail = req.params.userEmail;

  return usersServices
    .findOne(mail)
    .then((userFound) => {
      if (userFound === null) return res.status(401).json({ message: 'L\'utilisateur n\'existe pas !' });
      delete userFound.password;
      res.status(201).json(userFound);
    })
    .catch(err => next(err));
}
