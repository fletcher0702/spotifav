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
        .then(res => res)
        .catch(err => err);

      usersServices
        .deleteOne(userFound.email)
        .then(response => res.status(201).json({ message: `L'utilisateur ${mail} a été supprimé ! ` }))
        .catch(err => res.status(401).json({ erreur: 'Erreur lors de la suppréssion.' }));
    })
    .catch(err => next(err));
}
