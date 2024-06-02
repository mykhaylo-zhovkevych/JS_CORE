// Method Chaining is Calling one method after another in one continuous line of code.

// no method chaining

let userName = window.prompt("enter your username");

userName = userName.trim();
let letter = userName.charAt(0);
let = letter.toUpperCase();

let extraChars = userName.slice(1);
extraChars = extraChars.toLowerCase();
userName = letter + extraChars;

console.log(userName);


// with method chaining

userName = userName.trim().charAt(0).toUpperCase() + userName.trim().slice(1).toLowerCase();