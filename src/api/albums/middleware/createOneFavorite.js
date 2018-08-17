import IdValidator from 'valid-objectid';
import favoriteServices from '../../../modules/favoris/services';
import userServices from '../../../modules/users/services';
import spotifyApi from '../../../utils/spotify';

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

      console.log('user found ! ');

      favoriteServices
        .findOneByAlbumId(user, album)
        .then((albumFound) => {
          if (albumFound === null) {
            spotifyApi
              .getAlbum(album)
              .then((data) => {
                favoriteServices
                  .createOne(user, request.body)
                  .then(createdRes => response.status(201).json({ message: 'favoris créé !' }))
                  .catch(err => err);
              }, error => response.status(401).json({ message: 'album id ne correpond pas à un album spotify !' }))
              .catch(err => err);
          } else {
            response.status(401).json({ message: 'Album déjà en favoris !' });
          }
        })
        .catch(err => err);
    })
    .catch(err => err);
}
