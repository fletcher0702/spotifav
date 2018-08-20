import SpotifyWebApi from 'spotify-web-api-node';

const clientIdSpotify = '';
const clientSecretSpotify = '';
const spotifyApiConfig = {
  clientId: clientIdSpotify,
  clientSecret: clientSecretSpotify,
};

const spotifyApi = new SpotifyWebApi(spotifyApiConfig);

spotifyApi
  .clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body.access_token);
  }, error => console.log('something went wrong', error));

export default spotifyApi;
