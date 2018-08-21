/* eslint-disable max-len,no-underscore-dangle */
import favoriteServices from '../../../../modules/favoris/services';

export default function (request, response) {
  const favoriteView = 'favorites';

  if (typeof request.query.albumId === 'undefined') {
    response.render(favoriteView, { error: true, message: 'id du favoris invalide!' });
  }

  const user = request.user._id.toString();
  const favoriteAlbum = request.query.albumId;

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
