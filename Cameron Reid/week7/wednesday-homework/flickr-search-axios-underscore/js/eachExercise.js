// console.log('loaded here');

// const  sayHello = function(){
//   console.log('Oh hello!');
// }

// const runNicely = function( functionToRun ){
//   console.log('Hi let me run nicely etc...');

//   functionToRun();

//   console.log('it was so nice to etc etc');
// }

// runNicely(sayHello)


const each = function(array, callback ){
  for(let i = 0; i < array.length; i++){
    const currentItem = array[i]
    // console.log(currentItem);
    callback(currentItem);
  }
};

const arr = ['first', 'second', 'third']

each(arr, function( item ){
  console.log('inside callback', item);

})