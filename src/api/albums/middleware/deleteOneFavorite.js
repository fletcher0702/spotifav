/* eslint-disable max-len,no-underscore-dangle */
import IdValidator from 'valid-objectid';
import favoriteServices from '../../../modules/favoris/services';

export default function (request, response) {
  if (!IdValidator.isValid(request.params.userId)) response.send('userId non valide !');
  if (typeof request.params.favoriteId === 'undefined') response.status(401).json({ message: 'favoriteId non valide !' });


  const user = request.params.userId;
  const favoriteAlbum = request.params.favoriteId;

  return favoriteServices
    .findOneByAlbumId(user, favoriteAlbum)
    .then((favoriteFound) => {
      if (favoriteFound === null) {
        response.status(404).json({ message: 'album non existant' });
      }

      const id = favoriteFound._id.toString();
      favoriteServices
        .deleteOne(user, id)
        .then((deleteCount) => {
          if (deleteCount === 0) {
            response.status(401).json({ message: 'une erreur est survenue lors de la suppression !' });
          }

          response.status(201).json({ message: 'favoris supprimé !' });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}
