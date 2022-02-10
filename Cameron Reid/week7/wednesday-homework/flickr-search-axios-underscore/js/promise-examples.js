

//What is a promise?
// A promise is a way of dealing with asynchronous behaviour in js, i.e. a sonsisten way of dealing with data that takes a whilw to become available; a promise is a promise ABOUT data arriving sooner or later... or not arriving (throuwing an error)


// A promise is either in a state of pending - waiting for data 
//Fulfilled: 
    // - resolved - we have the data
    // - rejected - there was an error
// axios.get('http://www.numbersapi.com/42?json')
//   .then( function( res ){ 
//     console.log('we got the data!', res.data.text);
//   })
//   .catch( function( err ){
//     console.log("uh oh we fked up", err);
//   })

// When dealing with Promises, INSTEAD of a then-catch chain to deal with resolved/rejected promises, we can use a hot new syntax called: async/await

const getApiData = async function(){
  try {
    const res = await axios.get('http://www.numbersapi.com/42?json');
    console.log(res.data);
  }
  catch(err) {
    console.log('there was a problem: ', err);
  }
  // BECAUSE of the await in front of the method that returns a promise, JS acts the same was RUBY HTTParty.get() does - the code will block or wait UNTIL the response comes in and it eill give you the data as the return calue instead of a promise object 
};

getApiData();