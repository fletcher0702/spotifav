import usersServices from '../../../modules/users/services';

export default function (req, res, next) {

  usersServices
    .findOneById(req.user.userId)
    .then((userFound) => {

      req.body.email = userFound.email;
      usersServices
        .updateOne(userFound.email, req.body)
        .then(response => res.status(201).json({ message: 'utilisateur mis à jour' }))
        .catch(err => err);
    })
    .catch(err => next(err));
}
