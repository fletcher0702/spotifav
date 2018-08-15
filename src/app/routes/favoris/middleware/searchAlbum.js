import spotifyApi from './spotify';


export default function (request, response) {

  let searchAlbum = '';
  let searchLimit = 1;

  if (typeof request.query.album === 'undefined'){
      response.render('searchAlbum');
  }

  searchAlbum = request.query.album;

  if (typeof request.query.limit !== 'undefined'){
    searchLimit = parseInt(request.query.limit, 10);
  }

  console.log(searchAlbum);
  console.log(searchLimit);

  spotifyApi
    .searchAlbums(searchAlbum, { limit: searchLimit })
    .then((data) => {
      const searchResults = data.body.albums.items;
      const artists = searchResults[0];
      console.log(artists.id);

      const loggedIn = request.isAuthenticated();
      response.render('searchAlbum', { results: searchResults});
    }, (error) =>{
      console.log('Something is going wrong' + error) ;
    })
    .catch(err => err);
}
