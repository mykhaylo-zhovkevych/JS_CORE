// object can contain many properies and the object can be const or let 
const product = {
    name: 'basketball',
    price: 2095
  };
  console.log(product); 
  console.log(product.price);
  
  product.name = "cotton socks";
  console.log(product.name); 
// synatx ruules of creating the object for that i opne curly bracekt and each value is separete with : , to acces the objr us must use the dot notation and property
// property can be added by the objectName.newProperty = someValue, this will be added to the end of the object array
product.newProperty = true;
console.log(product.newProperty); 

delete product.newProperty ;
console.log(product.newProperty); 

// the reasons why theobject is used in the js are:
// they make the code more organized
// allows to use multiple values together

// another way of accessing the properties 
const product2 =  {
  name: "shirt",
  ['delivery-time']: '1 day',
  // nested object
  rating: {
    stars: 4.5,
    count: 76
  },
  fun: function function01() {
    console.log('function inside object');
  }
};
// this is the Bracket Notation
console.log(product2['name']);
// what the difference between using them, bracket notation let use properties that dont work with dot notation

// funy js moment here js thinks i what to do minus 
/* console.log(product2.delivery-time); */

// some pluses ofusing the bracket notation is that i can not only call the variables but also do adding product2['delivery + time']
console.log(product2['delivery-time']);

// accessing the nested properties 
console.log(product2.rating.count);

// in javascript the a function is another type of value, functions are also values 
product2.fun();

console.log(typeof console.log);

// here the Math is the object anf the random is the fucntion saved inside of this Math object
Math.random();



// Built-in Objects
// console objecs and the math know as the buil-in Objects 
// there are more two another objects 
// 1. JSON
// 2. localStorage

/* JSON
JavaScript Object Notation
- a syntax
- similar to JavaScript object
- but has less features */

// main rules of the JSON ist that 
// 1. it dont support '' only the ""
// 2. it dont support the function 
// 3. it is more universal and can be unterstood by more people 


/* We use JSON
- when we send data
between computers
- when we store data */
/* 
Built-in JSON Object
Convert:
JavaScript Object
JSON */

// convertio of the JS object ot the JSON
JSON.stringify(product2)
console.log(JSON.stringify(product2));



