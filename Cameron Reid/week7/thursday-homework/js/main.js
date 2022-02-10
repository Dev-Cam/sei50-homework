const FLICKR_API_KEY = '2f5ac274ecfac5a455f38745704ad084';
const FLICKR_BASE_URL = 'https://api.flickr.com/services/rest';


let searchFormNode, searchInputNode, resultsNode, detailsNode;

// Params:
// method=flickr.photos.search
// api_key  - REQUIRED
// format=json ??? for specifying format
// text - specify the search query
// nojsoncallback=1

// https://api.flickr.com/services/rest?method=flickr.photos.search&format=json&nojsoncallback=1&text=ocean+coral&api_key=2f5ac274ecfac5a455f38745704ad084

// $(function(){

const fetchSearchResults = async (queryText) => {
  
  console.log('in search results()', queryText);

  

  try{

    const res = await axios.get( FLICKR_BASE_URL, {
      params: {
        // axios will combine these key-value pairs into the querystring for us
        method: 'flickr.photos.search',
        api_key: FLICKR_API_KEY,
        format: 'json',
        nojsoncallback: 1,
        text: queryText // should come from user input
      }
    });

    console.log('data', res.data.photos );
    renderSearchResults(res.data.photos);

  } catch(err){
      console.log('AJAX Search error', err);
  }

    // .then( function( res ){
    //   console.log( res.data.photos.photo );
    // })
    // .catch( function( err ){
    //   console.log('AJAX Search error', err);
    // });

}; //fetchsearchresults


const renderSearchResults = (results) => {
 
  const ulNode = document.createElement('ul'); //creates a ul node ("<ul></ul>")
  results.photo.forEach( photo => {
    const imageURL = generateImageUrl(photo);
    // console.log(imageURL);
    const liNode = document.createElement('li'); // creates a li node and fills the inner html with an image tag
    liNode.innerHTML = ` 
    <img src="${ imageURL}" alt="${ photo.title }">
    `;

    liNode.addEventListener('click', ev => {
      fetchImageDetails( photo.id )
    })
    ulNode.appendChild( liNode );

  }); //foreach

  resultsNode.innerHTML = `
  <strong>
  Found ${results.total} results 
  (in ${ results.pages} pages:)</strong>
  `;

  resultsNode.appendChild( ulNode ); //add the <ul> to the actual DOM




}; //rendersearchresults()


const generateImageUrl = (photo, size='q') => {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${ size }.jpg`
}

const fetchImageDetails = async (id) => {
 console.log('in fetch', id);

 detailsNode.innerHTML = "<em>Loading</em>"
 detailsNode.style.display = 'block';
 resultsNode.style.display = 'none';

 try {

    const res = await axios.get( FLICKR_BASE_URL, {
      params: {
        method: 'flickr.photos.getInfo',
        api_key: FLICKR_API_KEY,
        photo_id: id,
        format: 'json',
        nojsoncallback: 1
      }
    });

    console.log('Details results', res.data);

    renderImageDetails( res.data.photo )
  } catch( err) {
    console.log('Details AJAX request error', err);
  }
}; //fetchImageDetails

const renderImageDetails = (photo) => {
  console.log('in renderImageDetails():', photo);

  

  detailsNode.innerHTML = `
    <a href="#" id="backLink"> Back to results</a>
    <h2>${ photo.title._content}</h2>
    <img src="${ generateImageUrl(photo, 'b') }" alt="${photo.title._content}">
    <p>
      ${ photo.description._content}
    </p>

  `;

  document.querySelector('#backLink').addEventListener('click', () => {
    detailsNode.style.display = 'none';
    resultsNode.style.display = 'block';
  })

} //renderImageDetails

document.addEventListener('DOMContentLoaded', function() {

  // fetchSearchResults('coral ocean');
  searchFormNode = document.querySelector('#searchForm')
  searchInputNode = document.querySelector('#searchText')
  resultsNode = document.querySelector('#results')
  detailsNode = document.querySelector('#details')

  searchInputNode.focus();

  searchFormNode.addEventListener('submit', ev => {
    ev.preventDefault();
    // const searchText = searchInputNode.value;
    // console.log('form submitted', searchText);
    resultsNode.innerHTML = `<em>Loading results...</em>`

    detailsNode.style.display = 'none';
    resultsNode.style.display = 'block';
    
    fetchSearchResults( searchInputNode.value )
  })


});// document ready handler

window.addEventListener('scroll', ev => {
  console.log('current window.scrollY', window.scrollY);
  console.log('document.body.scrollHeight', document.body.scrollHeight);


const bottomOfWindow = window.scrollY + window.innerHeight;
if(bottomOfWindow >= document.body.scrollHeight * 0.9 ){
  console.log('We have hit bottom');

  // start the next-page AJAX request a bit before the bottom
  // MAKE SURE YOU USE THROTTLE
}
})
