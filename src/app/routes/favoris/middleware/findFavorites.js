/* eslint-disable max-len,no-underscore-dangle,no-param-reassign,no-unneeded-ternary */
import favoriteServices from '../../../../modules/favoris/services';

export default function (request, response) {
  let searchLimit = 20;
  let searchOffset = 0;

  if (typeof request.query.limit !== 'undefined') {
    searchLimit = parseInt(request.query.limit, 10);
  }
  if (typeof request.query.offset !== 'undefined') {
    searchOffset = parseInt(request.query.offset, 10);
  }

  const user = request.user._id.toString();

  const favoriteView = 'favorites';
  return favoriteServices
    .find(user, searchLimit, searchOffset)
    .then((res) => {
      const emptyFavoriteTest = (res.length === 0);
      const favoritesDictionary = [];
      res.forEach((favorite) => {
        favorite._id = favorite._id.toString();
        favoritesDictionary.push(favorite);
      });
      response.render(favoriteView, { emptyFavorite: emptyFavoriteTest, favorites: favoritesDictionary });
    })
    .catch(err => err);
}
