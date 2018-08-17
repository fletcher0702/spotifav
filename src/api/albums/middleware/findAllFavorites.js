import favoriteServices from '../../../modules/favoris/services';

export default function (request, response) {

  let searchLimit = 20;
  let searchOffset = 0;


  if (typeof request.query.limit !== 'undefined') {
    searchLimit = parseInt(request.query.limit, 10);
  }
  if (typeof request.query.offset !== 'undefined') {
    searchOffset = parseInt(request.query.offset, 10);
  }


  return favoriteServices
    .findAll(searchLimit, searchOffset)
    .then((res) => {
      response.status(201).json(res);
    })
    .catch(err => err);
}
