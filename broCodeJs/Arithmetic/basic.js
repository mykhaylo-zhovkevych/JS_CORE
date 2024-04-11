/*
Basic Arithmetic Operators

    Addition (+): Adds two numbers or concatenates strings.
    Subtraction (-): Subtracts one number from another.
    Multiplication (*): Multiplies two numbers.
    Division (/): Divides one number by another.
    Modulus (%): Returns the remainder of a division.
    Increment (++): Increases an integer value by one.
    Decrement (--): Decreases an integer value by one.
*/ 

/*
An operand – is what operators are applied to. 
For instance, in the multiplication of 5 * 2 there are two operands: 
the left operand is 5 and the right operand is 2. Sometimes, people call these 
“arguments” instead of “operands”.
*/

/*
Unary operators require a single operand to operate on. 
They perform various operations, such as negating a numerical value, 
incrementing/decrementing values, or converting a value to a different type.
*/

/*
Binary operators require two operands to operate. 
They are used to perform operations such as arithmetic, logical operations, or comparisons.
*/

// Basic operations
result = 10 + 5; // 15
result = 10 - 5; // 5
result = 10 * 5; // 50
result = 10 / 5; // 2
result = 10 % 3; // 1

console.log(`Addition: ${addition}`);
console.log(`Subtraction: ${subtraction}`);
console.log(`Multiplication: ${multiplication}`);
console.log(`Division: ${division}`);
console.log(`Modulus: ${modulus}`);

// Increment and Decrement
let counter = 10;
counter++; // Now counter is 11
counter--; // Back to 10

/*
The + operator also serves as a concatenation operator for strings
*/
let result = "The answer is " + 42; // "The answer is 42"

let number = 10;
let text = " apples and ";
let total = 5 + text + number; // "5 apples and 10"

console.log(total); // 5 apples and 10



// Function to check if a number is even
function isEven(number) {
    return number % 2 === 0;
}
console.log(isEven(4)); // true
console.log(isEven(7)); // false



/*
Although both forms increase the variable by 1, there 
is a difference. The Postfix Form returns the original value
of the variable, before the increment/decrement The Prefix Form returns the value after the increment/decrement. 
This difference can be seen if we are using the returned value of the increment/decrement.
*/

// Example 4: Prefix vs. Postfix Increment Operators
let x = 1;
let y = x++; // y = 1, x = 2
let z = ++x; // z = 3, x = 3

console.log(`y: ${y}, x after y: ${x}`);
console.log(`z: ${z}, x after z: ${x}`);



// Example 5: Compound Assignment Operators
let a = 10;
a += 5; // a = 15
a -= 3; // a = 12
a *= 2; // a = 24
a /= 6; // a = 4

console.log(`Final value of a: ${a}`);


// Example 6: Arithmetic with Non-numeric Types Leading to NaN
let result1 = "Hello" - 1; // NaN
let result2 = "100" - "10"; // 90 (Both strings are coerced to numbers)

console.log(`Result 1: ${result1}`);
console.log(`Result 2: ${result2}`);

/*
Output Example 6: Arithmetic with Non-numeric Types Leading to NaN
 */

// Example 7: Floating Point Precision Issue

let preciseResult = 0.1 + 0.2; // Not exactly 0.3 due to floating point precision
console.log(`0.1 + 0.2 = ${preciseResult}`);
// Output 0.1 + 0.2 = 0.30000000000000004


