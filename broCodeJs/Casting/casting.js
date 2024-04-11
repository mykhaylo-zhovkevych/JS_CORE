// Implicit Type Casting (Type Coercion)
// Implicit type casting happens automatically when the context requires it. 
// For example, when you use a non-number type in a context where a number is expected, 
// JavaScript will automatically try to convert that type to a number.

let result = '3' * '2'; // Both strings are implicitly converted to numbers
console.log(result); // Output: 6


// Explicit Type Casting
// Explicit type casting is when you manually convert from one type to another. This is also known as type coercion. Below are examples of explicit type casting in JavaScript.

let stringToNumber = Number("123");
console.log(stringToNumber); // Output: 123

let stringToNumberUsingUnary = +"123";
console.log(stringToNumberUsingUnary); // Output: 123

let stringToInteger = parseInt("123.45");
console.log(stringToInteger); // Output: 123

let stringToFloat = parseFloat("123.45");
console.log(stringToFloat); // Output: 123.45


/*
Casting to a String
To explicitly cast a number to a string, you can use the String function or the toString method.
 */

let numberToString = String(123);
console.log(numberToString); // Output: "123"

let numberToStringUsingMethod = (123).toString();
console.log(numberToStringUsingMethod); // Output: "123"

/*
Casting to a Boolean
You can cast to a boolean using the Boolean function or by using the double NOT operator (!!).
*/

let truthyValue = Boolean(1); // Any non-zero number is truthy
console.log(truthyValue); // Output: true

let falsyValue = Boolean(0); // Zero is falsy
console.log(falsyValue); // Output: false

let truthyValueUsingNot = !!1;
console.log(truthyValueUsingNot); // Output: true

let falsyValueUsingNot = !!0;
console.log(falsyValueUsingNot); // Output: false
