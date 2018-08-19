import spotifyApi from '../../../../utils/spotify';


export default function (request, response) {
  let searchAlbum = '';
  let searchLimit = 10;

  if (typeof request.query.album === 'undefined' || request.query.album === '') {
    response.render('searchAlbum');
  }

  searchAlbum = request.query.album;

  if (typeof request.query.limit !== 'undefined') {
    console.log(typeof parseInt(request.query.limit, 10));
    console.log(parseInt(request.query.limit, 10).toString() === 'NaN');

    if (parseInt(request.query.limit, 10).toString() !== 'NaN') {
      searchLimit = parseInt(request.query.limit, 10);
    }
  }

  spotifyApi
    .searchAlbums(searchAlbum, { limit: searchLimit })
    .then((data) => {
      const searchResults = data.body.albums.items;

      response.render('searchAlbum', { results: searchResults });
    }, (error) => {
      console.log(`Something is going wrong${error}`);
    })
    .catch(err => err);
}
