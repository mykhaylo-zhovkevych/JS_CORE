
function happyBirthdaay(username, age) {
    console.log("happy birthday to you!");
    console.log(`happy birthday to ${username} you!`);
    console.log(`happy birthday to ${age} you!`);
    console.log("happy birthday dear you!");
    console.log("happy birthday to you!");
}

happyBirthdaay("MZ", 18);
happyBirthdaay("robert", 28);

function add(x, y) {
/*  let result = x + y;
    return result; */

// shortcut
    return x + y;

}
let answer = add(2,3);
console.log(answer);
// or
console.log(add(2,3));

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y; 
}
function divide(x, y) {
    return x / y;
}
console.log(subtract(2,3));

function isEven(number) {
    if(number % 2 === 0) {
        return true;
    }
    else {
        return false;
    }
}
console.log(isEven(10));

//perematers
function isValidEmail(emali) {
    if(emali.includes("@")){
        return true;
    }
    else{
        return false;
    }
}
//                      arguments
console.log(isValidEmail("Some@fake.com"));

