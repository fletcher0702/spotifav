/* eslint-disable max-len,no-underscore-dangle,padded-blocks */
import IdValidator from 'valid-objectid';
import favoriteServices from '../../../../modules/favoris/services';

export default function (request, response) {
  if (!IdValidator.isValid(request.params.userId)) {
    response.send({ error: true, message: 'id utilisateur invalide!' });
  }

  const user = request.params.userId;
  const favoriteAlbum = request.params.albumId;
  const favoritesView = 'favorites';

  return favoriteServices
    .findOneByAlbumId(user, favoriteAlbum)
    .then((favoriteFound) => {
      if (favoriteFound === null) {
        response.send({ error: true, message: 'album non existant' });
      }

      const id = favoriteFound._id.toString();
      favoriteServices
        .deleteOne(user, id)
        .then((deleteCount) => {
          if (deleteCount === 0) {
            response.render(favoritesView, { error: true, message: 'une erreur est survenue lors de la suppression !' });
          }

          response.render(favoritesView, { success: true, message: 'favoris supprimé !' });
        })
        .catch(err => err);
    })
    .catch(err => err);
}
