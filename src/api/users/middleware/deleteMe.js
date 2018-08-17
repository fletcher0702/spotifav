import usersServices from '../../../modules/users/services';
import favoritesServices from '../../../modules/favoris/services';

export default function (req, res, next) {
  return usersServices
    .findOneById(req.user.userId)
    .then((userFound) => {
      favoritesServices
        .deleteAssociatedFavorites(userFound._id.toString())
        .then(res => res)
        .catch(err => err);

      usersServices
        .deleteOne(userFound.email)
        .then(response => res.status(201).json({ message: 'utilisateur supprimé' }))
        .catch(err => err);
    })
    .catch(err => next(err));
}
