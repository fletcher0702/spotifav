import SpotifyWebApi from 'spotify-web-api-node';
import spotifyApiConifg from '../../../../utils/spotify';

const spotifyApi = new SpotifyWebApi(spotifyApiConifg);
spotifyApi
  .clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body.access_token);
  }, error => console.log('something went wrong', error));


export default function (request, response) {
  let searchAlbum = '';
  let searchLimit = 10;

  if (typeof request.query.album === 'undefined' || request.query.album === '') {
    response.render('searchAlbum');
  }

  searchAlbum = request.query.album;

  if (typeof request.query.limit !== 'undefined') {
    if (parseInt(request.query.limit, 10).toString() !== 'NaN') {
      searchLimit = parseInt(request.query.limit, 10);
    }
  }

  spotifyApi
    .searchAlbums(searchAlbum, { limit: searchLimit })
    .then((data) => {
      const searchResults = data.body.albums.items;

      response.render('searchAlbum', { results: searchResults });
    }, error => error)
    .catch(err => err);
}
