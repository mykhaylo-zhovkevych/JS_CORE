//The spread operator (...) in JavaScript is a powerful tool that allows you to expand an iterable, 
//such as an array or a string, into individual elements. This can be useful in a variety of contexts, 
//such as when you need to combine arrays, add elements to an array, or copy arrays.

let numbers = [1,2,3,4,5,6,7,8,9];
let maximum = Math.max(...numbers);
let minimum = Math.min(...numbers);

console.log(numbers);

console.log(...numbers);

console.log(maximum);

console.log(minimum);

let fruits = ["apple", "orange", "banan"];
let vegetables = ["carrots", "celery", "potatoes"];
let foods = [...fruits, ...vegetables, "eggs", "milk"];

console.log(foods);


