import SpotifyWebApi from 'spotify-web-api-node';
import spotifyApiConfig from '../../../utils/spotify';

const spotifyApi = new SpotifyWebApi(spotifyApiConfig);
spotifyApi
  .clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body.access_token);
  }, error => console.log('something went wrong', error));

export default function (request, response) {
  let searchAlbum = '';
  let searchLimit = 1;

  if (typeof request.query.album === 'undefined') {
    return response.status(401).json({ message: 'erreur album non spécifié' });
  }

  searchAlbum = request.query.album;

  if (typeof request.query.limit !== 'undefined') {
    searchLimit = parseInt(request.query.limit, 10);
  }

  return spotifyApi
    .searchAlbums(searchAlbum, { limit: searchLimit })
    .then((data) => {
      const searchResults = data.body.albums.items;
      const results = [];

      searchResults.forEach((album) => {
        results.push({
          id: album.id,
          name: album.name,
        });
      });

      response.status(201).json(results);
    }, (error) => {
      console.log(`Something is going wrong${error}`);
    })
    .catch(err => err);
}
