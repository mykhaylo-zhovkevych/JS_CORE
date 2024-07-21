// callbck = is a function that passed as an argument to another function.
// used to handel asynchronous iperations: 
/* such as: 
   1. Reading a file
   2. Network request  
   3. Interacting with databases 
*/
// the idea is like Hey, when you are done, call this next... 
// As with the callback, we ensure that the function is executed after the main function

hello(leave);

// need paramater for the function input 
function hello(callback) {
    console.log("Hello");
    callback();
}
function leave() {
    console.log("Leave");
}
function wait() {
    console.log("waits");
}
function goodbey() {
    console.log("Goodbey");
}


// ________________________________
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