/* eslint-disable max-len */
import IdValidator from 'valid-objectid';
import favoriteServices from '../../../../modules/favoris/services';

export default function (request, response) {
  const favoriteView = 'favorites';

  if (!IdValidator.isValid(request.params.userId)) {
    response.render(favoriteView, { error: true, message: 'id utilisateur invalide!' });
  }

  const user = request.params.userId;
  const favoriteAlbum = request.params.albumId;

  return favoriteServices
    .findOneByAlbumId(user, favoriteAlbum)
    .then((favoriteFound) => {

      if (favoriteFound === null) {
        response.render(favoriteView, { error: true, message: 'album non existant' });
      }

      const id = favoriteFound._id.toString();
      favoriteServices
        .deleteOne(user, id)
        .then((deleteCount) => {

          if (deleteCount === 0) {
            response.render(favoriteView, { error: true, message: 'une erreur est survenue lors de la suppression !' });
          }

          response.render(favoriteView, { success: true, message: 'favoris supprimé !' });
        })
        .catch(err => err);
    })
    .catch(err => err);
}
