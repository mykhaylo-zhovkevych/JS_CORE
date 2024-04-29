/* The ternary operator is a concise way to perform conditional operations in a single line of code. 
It's called "ternary" because it involves three operands. 
It acts as a shorthand for an if-else statement and is most commonly used to assign a value to a variable based on a condition. */

// #example 1
let age = 20;
//condition     if true               if false 
let message = age >= 19 ? "You are an adult" : "You are a minor"; // here the text will be assigned based on the condition 

// #example 2
let time = 19;
let greeting = time < 12 ? "Good morning" : "good afternoon";
console.log(greeting);

// #example 3
let isStudent = false;
let message01 = isStudent ? "You are a student " : " You are not a student ";
console.log(message01);


// However, you can nest ternary operations like this:
let message02 = isStudent ? "You are a student" : (someOtherCondition ? "You are not a student but something else" : "You are not a student");
console.log(message02);
