const FLICKR_API_KEY = '2f5ac274ecfac5a455f38745704ad084';

const FLICKR_BASE_URL = 'https://api.flickr.com/services/rest'
const FLICKR_IMG_URL = 'https://api.flickr.com/'

//Params:
//method, api_key - REQUIRED
//format=json ?? for specifying format
//text - specify the search query
//nojsoncallback=1

// https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&nojsoncallback=1&text=ocean+coral&api_key=2f5ac274ecfac5a455f38745704ad084

const fetchSearchResults = function ( search ){
  axios.get(FLICKR_BASE_URL, {
    params: {
      method: 'flickr.photos.search',
      api_key: FLICKR_API_KEY,
      format: 'json',
      nojsoncallback: 1,
      text: `${search}`
    } 
  })
  .then( function( res ){
    console.log( res.data.photos.photo[0].id );
    renderSearchResults(res.data, search);
  })
  .catch( function( err ){
    console.log( 'AJAX search error', err);
  })
}

const renderSearchResults = function( data, search ){
  const $output = $('#output');
  $output.html(`<p>Search results for ${ search }: </p>`)
  data.photos.photo.forEach( function (image){
    axios.get(FLICKR_IMG_URL, {
      params: {
        server_id: image.server,
        secret: image.secret,
        id: image.id,
        size_suffix: 'q'
      }, 

      
    })
    
    .then( function( res ){
      $output.append(image)
      console.log( 'we have images!' );
      
    })
    .catch( function( err ){
      console.log( 'AJAX search error', err);
    })
  })
  
}


$(function() {
  

  $('#searchForm').on('submit', function( ev ){
    ev.preventDefault();
    console.log('form submitted');
    const search = $('#userQuery').val();
    fetchSearchResults(search)
   
  });
  

}); // document ready handler 

//https://live.staticflickr.com/65535/51871116708_dec6029114_q.jpg
