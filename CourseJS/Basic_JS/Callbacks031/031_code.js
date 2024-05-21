// callbck = a function that us passed as an argument to another function.
// used to handel asynchronous iperations: 
/* 
   1. Reading a file
   2. Network request  
   3. Interacting with databases 
*/
hello(leave);

function hello(callback) {
    console.log("Hello");
    callback();
}

function wait() {
    console.log("waits");
}

function leave() {
    console.log("Leave");
}

function goodbey() {
    console.log("Goodbey");
}

/* Example two */
// the displayConsole will be called ast the callback and the x and y as the paramaters 
sum(displayConsole, 2, 5);

// as here I have redistributed the different tasks to the different functions, first I calculate the required data and then I forward it to the different functions
function sum(callback, x, y) {
    let result = x + y;
    callback(result);
}

function displayConsole(result) {
    console.log(result);
}