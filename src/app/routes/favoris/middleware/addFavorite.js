/* eslint-disable max-len */

import favoriteServices from '../../../../modules/favoris/services';
import spotifyApi from '../../../../utils/spotify';

export default function (request, response) {

  if (typeof request.params.albumId === 'undefined') {
    // response.render(favoriteView, { error: true, message: 'id du favoris invalide!' });
    response.send({ error: true, favorite: false, message: 'Id album invalide!' });
  }

  const user = request.user._id.toString();
  const favoriteAlbum = request.params.albumId;
  const favoriteName = request.params.albumName;

  return favoriteServices
    .findOneByAlbumId(user, favoriteAlbum)
    .then((albumFound) => {
      if (albumFound === null) {
        spotifyApi
          .getAlbum(favoriteAlbum)
          .then((data) => {

            const newFavorite = {

              userId: user,
              albumId: favoriteAlbum,
              name: favoriteName,
            };

            favoriteServices
              .createOne(user, newFavorite)
              .then((createdRes) => {
                response.send({ error: false, favorite: false, message: 'favoris créé !' });
              })
              .catch(err => response.send({ error: true, favorite: false, message: 'une erreur innatendue est arrivée...' }));
          }, (error) => {
            response.send({ error: true,favorite: false, message: 'album id ne correpond pas à un album spotify !' });
          })
          .catch(err => err);
      } else {
        response.send({ error: true, favorite: true, message: 'Album déjà en favoris ' });
      }
    })
    .catch(err => err);
}
