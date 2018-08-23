/* eslint-disable max-len,no-underscore-dangle */

import SpotifyWebApi from 'spotify-web-api-node';
import favoriteServices from '../../../../modules/favoris/services';
import spotifyApiConfig from '../../../../utils/spotify';

const spotifyApi = new SpotifyWebApi(spotifyApiConfig);
spotifyApi
  .clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body.access_token);
  }, error => console.log('something went wrong', error));

export default function (request, response) {
  if (typeof request.params.albumId === 'undefined') {
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
          .then(() => {
            const newFavorite = {

              userId: user,
              albumId: favoriteAlbum,
              name: favoriteName,
            };

            favoriteServices
              .createOne(user, newFavorite)
              .then(() => {
                response.send({ error: false, favorite: false, message: 'favoris créé !' });
              })
              .catch(() => response.send({ error: true, favorite: false, message: 'une erreur innatendue est arrivée...' }));
          }, () => {
            response.send({ error: true, favorite: false, message: 'album id ne correpond pas à un album spotify !' });
          })
          .catch(err => err);
      } else {
        response.send({ error: true, favorite: true, message: 'Album déjà en favoris ' });
      }
    })
    .catch(err => err);
}
