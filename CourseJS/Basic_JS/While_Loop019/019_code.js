// while loop = repeat soem code WHILE some condition is true 

let username = "";

while(username === "" || username === null) {
    username = window.prompt(`enter your name `);
}
console.log(`Hello ${username}`);

// do while loop fist make first statment than checks
/* let username = "";

do {
    username = window.prompt(`Enter your name:`);
} while (username === "" || username === null);

console.log(`Hello ${username}`);
 */

let loggedIn = false;
let userName;
let password;

while(!loggedIn) {
    userName = window.prompt(`Enter you user name`);
    password = window.prompt(`Enter you user password`);

    if(userName === "myUsername" && password === "myPasword") {
        loggedIn = true;
        console.log("you are logged it");
    }
    else {
        console.log("Invalid credentials. try again");
    }
}