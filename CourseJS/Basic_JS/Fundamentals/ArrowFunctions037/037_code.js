// arrow function = a concise way to write functionexpressions good forsimple functions that you use only once (parameters) = some code

/*

Concise Syntax: Shorter and more readable code, especially for small or inline functions.
Lexical this Binding: Inherits this from the surrounding context, avoiding common pitfalls with traditional functions.
No arguments Object: Uses rest parameters instead of the arguments object.
Cannot Be Used as Constructors: Not suitable for use with the new keyword.
Ideal for Callbacks: Perfect for array methods, event handlers, and other callback scenarios due to their brevity and context handling.

*/

const hello01 = function() {
    console.log("hello")
}

const hello = () => console.log("hello");
// to invoke
hello();

const hello02 = (name) => console.log(`Hello ${name}`);
hello02("MZ");

// if I need to include more than one statment than i need {} like: const hello02 = (name) => { console.log(`Hello ${name}`) console.log("yes")};


// example 02
setTimeout(function () {
    console.log("Hello");
}, 3000);

// more concise way of writhe the function 

setTimeout( () => console.log("Hello"), 3000)

