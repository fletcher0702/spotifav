/* eslint-disable consistent-return */
import usersServices from '../../../modules/users/services';

export default function (req, res, next) {
  const mail = req.params.userEmail;

  usersServices
    .findOne(mail)
    .then((userFound) => {
      if (userFound === null) return res.status(401).json({ message: 'L\'utilisateur n\'existe pas !' });

      return usersServices
        .updateOne(mail, req.body)
        .then(() => res.status(201).json({ message: `Utilisateur ${mail} mis à jour !` }))
        .catch(err => err);
    })
    .catch(err => next(err));
}
