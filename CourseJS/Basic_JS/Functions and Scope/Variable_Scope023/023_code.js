// the varibales can be reused as long as they are in the different scope 


// it is importnat to work from the top to the bottom
// global scope
let x = 3;

function1();
function2();
// these variables in the different scope in curled brackets so they will work 
//function can see of the another function

// if i had the local and global varibale with the same name the local will get the priority and will be called

function function1() {
/*     let x = 1; */
    console.log(x);
}

function function2() {
/*     let x = 2; */
    console.log(x);
}

