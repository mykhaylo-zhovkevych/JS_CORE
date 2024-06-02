/*
var: This is the oldest keyword used to declare variables. 
Variables declared with var are function-scoped or globally-scoped if not declared inside a function.
*/
var variable01 = "John Doe";

/*
let: Introduced in ES6 (ECMAScript 2015), let allows you to declare block-scoped variables, providing better control and reducing errors.
*/

let variable02 = 25;

/*
const: Also introduced in ES6, const is used to declare variables whose values are not intended to change, i.e., constants.
 const variables must be initialized at the time of declaration. 
 */

 const variable03 = 30;

/*
Data Types

JavaScript variables can hold different types of values, including:

    Primitive Types: Undefined, Null, Boolean, Number, String, Symbol, and BigInt.
    Non-Primitive Types: Object (including arrays, functions, and custom objects).
    

*/



 document.getElementById('userInfoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to server

    // Using var for a variable that will be reassigned
    var greetingMessage = "Hello, ";

    // Using const for a variable that will not change
    const userName = document.getElementById('name').value;
    
    // Using let in a block scope inside if statement
    if (userName) {
        let greetingEnd =  " !";
        greetingMessage += userName + greetingEnd;
    }

    // Attempting to show use of const with reassignment (uncomment to see error)
    // userName = "Another Name"; // This line would throw an error because const cannot be reassigned

    // Display the greeting
    document.getElementById('greeting').innerText = greetingMessage;

    // Using let for age to demonstrate it's block-scoped nature
    let userAge = parseInt(document.getElementById('age').value);
    if (userAge) {
        // Adding a conditional message based on age
        let ageMessage = userAge < 18 ? " You're under 18." : " You're an adult.";
        document.getElementById('greeting').innerText += ageMessage;
    }
});
