// example data
const bros=[ 'Groucho', 'Harpo', 'Chico' ];

// 2 styles of using underscore
// 1.
// _.each(bros, function(item){
//   console.log(item);
// })

// 2.
_(bros).each( function( item, i ){
  console.log(i, item);
})

const groucho = {
  name: 'Groucho',
  instrument: 'Guitar',
  vice: 'cigars'
}

_(groucho).each( function( val, key ){
  console.log(`${key}: ${val}`);
})

// ES6 version
bros.forEach( function( item ){
  console.log( item );
})

//Arrow functions ###################################################
console.log('Arrow functions #############################################');

// Simplest version:
bros.forEach( item => console.log(item) );

//Longer version
bros.forEach( (item, index) => console.log(index, item));

//slightly longer again: need to use return when ever curly brackets are used
bros.forEach((item,index) => {
  console.log('index:', index);
  console.log('item', item);
})

// Creating named functions looks the same:

// const myFunc = function(item){
//   // code.
// };

// const myFunc = () => {

// };

console.log('map() ###########################################')

//map() transforms an input array of values into an output array of values, according to what your callback function returns from each iteration

const nums = [1,2,3,4,5,6];

const output = _(nums).map( function( item ){
  return item * 2;
});

console.log('output of map():', output);

// Using .map() with arrow function + implicit returns using underscore

const mapArrowOutput = _(nums).map( item => item * 2);
console.log('mapArrowOutput:', mapArrowOutput);

//es6 map:
const es6ArrowOutput = nums.map( item => item * 2);
console.log('es6ArrowOutput:', mapArrowOutput);

const uppercaseBros = bros.map(b => b.toUpperCase())
console.log('uppercaseBros', uppercaseBros);

console.log('Reduce() #####################################');

// reduce() (aka 'inject' in Ruby) takes an input array, and "boils it down" to a single balue, by repeatedly applying the code you give it in your callback function;
//as with map(), reduce() cares about the return value from your callback

const sum = _(nums).reduce( function( runningTotal, item ){
  console.log('______________________');
  console.log('runningTotal', runningTotal);
  console.log('item', item);
  const newTotal = runningTotal + item;
  console.log(newTotal);
  return newTotal;
})

console.log('reduce sum:', sum);

// es6 .reduce():

const es6Sum = nums.reduce( function( runningTotal, item){
  return runningTotal + item;
})

console.log(es6Sum)

// ActiveRecord-style Underscore methods
// - for search through data, usually an array of objects

const brothers = [
  { name: 'Groucho', instrument: 'guitar', vice: 'cigars', age: 44, nums: [1,2,3,5] },
  { name: 'Harpo', instrument: 'harp', vice: 'mutism', age: 42, nums: [1,2,3] },
  { name: 'Chico', instrument: 'guitar', vice: 'infidelity', age: 39, nums: [1,2,3,5] },
];

// Like ActiveRecord's Brother.find_by(instrument: 'guitar', age: 39 )
const guitarist = _(brothers).findWhere( { instrument: 'guitar', age: 39} );
console.log('guitarist', guitarist);

//es6 equivalent: slightly different, in that it does NOT assume the array of elements are all objects; so instead of passing in a "search criteria object" as argument, you have to give a test function: the first array element which causes the function to return true is the final return value of the .find() itself

const es6Guitarist = brothers.find( function( item ){
  return item.instrument === 'guitar';
})

// const es6Guitarist = brothers.find( item => item.instrument === 'guitar' )

console.log('es6Guitarist:', es6Guitarist)

// Like ActiveRecord .where: find ALL matching rows, i.e. Message.where(user_id: 3)
const allGuitarists = _(brothers).where({instrument: 'guitar'});
console.log('allGuitarists:', allGuitarists)

const es6AllGuitarists = brothers.filter( bro => bro.instrument === 'guitar' )
console.log('es6AllGuitarists:', es6AllGuitarists)

// How do I just get a true/false answer as to whether ANy element in the array passes some test?
const areThereAnyHarpists = brothers.some( bro => bro.instrument === 'harp')
console.log('areThereAnyHarpists', areThereAnyHarpists)

const isEveryoneAbove30 = brothers.every( bro => bro.age > 40);
console.log('above30?', isEveryoneAbove30);