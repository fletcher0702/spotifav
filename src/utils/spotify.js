import SpotifyWebApi from 'spotify-web-api-node';
import spotifyUtils, {spotifyApiConfig} from './spotify.utils';

const spotifyApi = new SpotifyWebApi(spotifyApiConfig);

spotifyApi.setAccessToken(spotifyUtils.accessToken);

export default spotifyApi;
