let age = window.prompt("How old are you?");

age = Number(age);

age+=1;

console.log(age, typeof age);

let y ="pizza";
let x ="pizza";
let z ="pizza";

x = Number(x); 
y = String(x);
z = Boolean(x);

console.log(x, typeof x); // NaN means not a number
console.log(y, typeof y); // dont do anything
console.log(z, typeof z); // here will be true

let y ="0";
let x ="0";
let z ="0";

console.log(x, typeof x); // 0 number 
console.log(y, typeof y); // 0 but string
console.log(z, typeof z); // true boolean


let y ="";
let x ="";
let z ="";

console.log(x, typeof x); // 0 number
console.log(y, typeof y); // string
console.log(z, typeof z); // false boolean // this can be used to check if the user typed anything at all 


let y ;
let x ;
let z ;

console.log(x, typeof x); // NaN number
console.log(y, typeof y); // undefined string
console.log(z, typeof z); // false boolean 



