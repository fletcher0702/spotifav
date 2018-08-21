/* eslint-disable consistent-return,no-underscore-dangle */
import usersServices from '../../../modules/users/services';
import favoritesServices from '../../../modules/favoris/services';

export default function (req, res, next) {
  const mail = req.params.userEmail;

  if (mail === 'undefined' || mail === '') return res.status(401).json({ message: 'Champ email obligatoire !' });


  return usersServices
    .findOne(mail)
    .then((userFound) => {
      if (userFound === null) return res.status(401).json({ message: 'L\'utilisateur n\'existe pas !' });

      favoritesServices
        .deleteAssociatedFavorites(userFound._id.toString())
        .then(response => response)
        .catch(err => err);

      usersServices
        .deleteOne(userFound.email)
        .then(() => res.status(201).json({ message: `L'utilisateur ${mail} a été supprimé ! ` }))
        .catch(() => res.status(401).json({ erreur: 'Erreur lors de la suppréssion.' }));
    })
    .catch(err => next(err));
}
