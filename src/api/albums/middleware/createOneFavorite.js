import IdValidator from 'valid-objectid';
import SpotifyWebApi from 'spotify-web-api-node';
import favoriteServices from '../../../modules/favoris/services';
import userServices from '../../../modules/users/services';
import spotifyApiConfig from '../../../utils/spotify';

const spotifyApi = new SpotifyWebApi(spotifyApiConfig);
spotifyApi
  .clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body.access_token);
  }, error => console.log('something went wrong', error));

export default function (request, response) {
  if (!IdValidator.isValid(request.params.userId)) response.send('userId non valide !');
  if (typeof request.body.albumId === 'undefined') response.send('albumId non définit !');

  const user = request.params.userId;
  const album = request.body.albumId;

  return userServices
    .findOneById(user)
    .then((userFound) => {
      if (userFound === null) {
        response.status(401).json({ message: 'L\'utilisateur n\'existe pas' });
      }

      favoriteServices
        .findOneByAlbumId(user, album)
        .then((albumFound) => {
          if (albumFound === null) {
            spotifyApi
              .getAlbum(album)
              .then(() => {
                favoriteServices
                  .createOne(user, request.body)
                  .then(() => response.status(201).json({ message: 'favoris créé !' }))
                  .catch(err => err);
              }, () => response.status(401).json({ message: 'album id ne correpond pas à un album spotify !' }))
              .catch(err => err);
          } else {
            response.status(401).json({ message: 'Album déjà en favoris !' });
          }
        })
        .catch(err => err);
    })
    .catch(err => err);
}
