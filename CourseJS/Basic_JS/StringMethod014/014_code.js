/* In JavaScript, the string is a fundamental data type and is quite different from languages like C or Java, 
where strings are either arrays of characters or objects respectively. 
Here's how strings are built and managed in JavaScript:

In summary, JavaScript treats strings as immutable sequences of UTF-16 code units. 
There's no separate character type, and operations on strings always result in new string values without affecting the original string. 
This design simplifies string handling at a high level but requires understanding when dealing with Unicode and complex transformations.
*/

let userName = " BroCode   ";

console.log(userName.charAt(0));

// index of the first occurrence of the char
console.log(userName.indexOf("o"));

console.log(userName.lastIndexOf("o"));

console.log(userName.length);

userName = userName.trim();
// instead of the trim .toLowerCase(); and .toUpperCase(); will make the whole string upper or lower

// this reprat the sting and make non terminator at the end
userName = userName.repeat(2);
console.log(userName);

let userName01 = "mz";
let result = userName01.startsWith(" ");
if (result) {
        console.log(" you can not live this field empty");
} else
console.log(userName01 +" " + "great success");

// .endsWith looks for is at the and ther is like space.

let userName02 = "mZ ";
let result02 = userName02.includes(" ");

if (result02) {
    console.log("you can not have space at the end");
} else
console.log(userName02 +" " + "great success");



let phoneNumeber = "123-123-2322";
phoneNumeber = phoneNumeber.replaceAll("-", "");
console.log(phoneNumeber);

phoneNumeber = phoneNumeber.padStart(15, "0");
// padEnd do the same just in the revers
console.log(phoneNumeber);



//          |String slicing|
// String slicing is creating a substring from a portion of another String. slice(start, end)
 
const fullName = "Mykayhlo Zhovkevych";
let firstName = fullName.slice(0, 8);
let secoundName = fullName.slice(8, 19);

console.log(firstName, secoundName);


const fullName01 = "Mykayhlo Zhovkevych";
// this one looks for the first appears of the space 
let firstName01 = fullName01.slice(0, fullName01.indexOf(" "));
// here it looks for the first sapce amd stars at the one position more than in general 
let lastName01 = fullName01.slice(fullName01.indexOf(" ")+ 1);
console.log(firstName01, lastName01);

// exercize
const email = "mz@gmail.com";

let userName03 = email.slice(0, email.indexOf("@"));
let extension = email.slice(email.indexOf("@") + 1);

console.log(userName03, extension);





