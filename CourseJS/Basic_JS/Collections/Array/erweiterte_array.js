// 4. Transforming Arrays with map

/* 
The map() method is a powerful and commonly used function in JavaScript that allows you to transform elements in an array. 
It creates a new array populated with the results of calling a provided function on every element in the original array. 
*/

/* 
How map() Works:

    Original Array: map() operates on an array and processes each element in that array.
    Callback Function: You pass a callback function to map(). This function is executed once for each element in the array.
    Return Value: The value returned from the callback function becomes the corresponding element in the new array that map() returns. */

let numbers = [1, 2, 3, 4, 5];

// Doubling each element in the array
let doubled = numbers.map(function (number) {
  return number * 2;
});

console.log(doubled); // Outputs: [2, 4, 6, 8, 10]

// more examples

// 1 Converting to String
let numbers01 = [1, 2, 3, 4, 5];
// the variable in the btackets shoude be not the same
let strings01 = numbers01.map(function (numbers01) {
  return "Number " + numbers01;
});
console.log(strings01);


// example 02
let users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

let names = users.map(function (user) {
  return user.name;
});

console.log(names);


// example 03
let numbers02 = [1,2,3,4,5];
let squared = numbers.map(number => number * number);
console.log(squared);

