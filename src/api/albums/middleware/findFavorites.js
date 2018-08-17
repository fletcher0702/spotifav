import IdValidator from 'valid-objectid';
import favoriteServices from '../../../modules/favoris/services';

export default function (request, response) {
  console.log(request.params.userId);
  console.log(request.body);

  let searchLimit = 20;
  let searchOffset = 0;

  if (!IdValidator.isValid(request.params.userId)) response.send('userId non valide !');
  if (typeof request.query.limit !== 'undefined') {
    searchLimit = parseInt(request.query.limit, 10);
  }
  if (typeof request.query.offset !== 'undefined') {
    searchOffset = parseInt(request.query.offset, 10);
  }

  const user = request.params.userId;

  return favoriteServices
    .find(user, searchLimit,searchOffset)
    .then((res) => {
      response.send(res);
    })
    .catch(err => err);
}
