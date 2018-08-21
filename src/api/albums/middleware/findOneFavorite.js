import IdValidator from 'valid-objectid';
import favoriteServices from '../../../modules/favoris/services';
import userServices from '../../../modules/users/services';

export default function (request, response) {
  if (!IdValidator.isValid(request.params.userId)) response.send('userId non valide !');
  if (typeof request.params.favoriteId === 'undefined') response.send('favoriteId non définit !');

  const user = request.params.userId;
  const favoriteAlbum = request.params.favoriteId;

  return userServices
    .findOneById(request.params.userId)
    .then((userFound) => {
      if (userFound === null) {
        response.send('user not found');
      }

      return favoriteServices
        .findOne(user, favoriteAlbum)
        .then((result) => {
          response.send(result);
        })
        .catch(err => err);
    })
    .catch(err => err);
}
