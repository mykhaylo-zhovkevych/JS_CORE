//Function Declarations

// A function declaration defines a named function and the function can be called before it is defined in the code due to hoisting. 
// Hoisting is JavaScript's behavior of moving declarations to the top of the current scope.

sayHello();

function sayHello() {
    console.log("Hello!");
}
// In this example, the sayHello function can be called before it is defined in the code due to hoisting.

// Function Expressions

// A function expression defines a function as a part of an expression, typically by assigning it to a variable. 
// Function expressions are not hoisted, so they cannot be called before they are defined.

const sayHello = function() {
    console.log("Hello!");
};

sayHello(); // "Hello!"
// In this example, the sayHello function is defined as a function expression and assigned to the variable sayHello. The function can only be called after the assignment.


// Detailed Example of Function Expression
// Function Expression
const add = function(a, b) {
    return a + b;
};

// Using the function
const sum = add(5, 3);
console.log(sum); // Output: 8


// Yes, in JavaScript, functions are first-class objects, which means you can use them as parameters to other functions.

// Some example
// Function that takes another function as a parameter
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

// Function to be used as a callback
function sayGoodbye() {
    console.log("Goodbye!");
}

// Passing the function as a parameter
greet("Alice", sayGoodbye);



// Better example
const numbers  = [1,2,3,4,5,6];
const squares = numbers.map(function (element) {
    return Math.pow(element, 2);
});

console.log(squares);
// plus of such implementation that we use this function only once and there no need for global variables to be declared


/*
USE CASES: 
1. Callbacks in Asynchronous Operations
2. Higher-Order Functions
3. Closures
4. Event Listeners
*/

// 1.
// Function expressions are commonly used as callbacks in asynchronous operations. A callback is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.
setTimeout(function() {
    console.log("Executed after 2 seconds");
}, 2000);
// 2.
// Higher-order functions are functions that take other functions as arguments or return functions as their result. Function expressions are often used in this context.
const numbers01 = [1, 2, 3, 4, 5];
const doubled = numbers01.map(function(num) {
    return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]
// 3.
// A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope. Function expressions are frequently used to create closures.
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
// 4.
// Function expressions are commonly used as event handlers in JavaScript. Event listeners wait for an event to occur and then execute the attached function.
document.getElementById("myButton").addEventListener("click", function() {
    console.log("Button clicked!");
});
