// general 
let age01 = 12;
// if true
if(age01 >=19) {
    console.log("you are old enough");
}
else {
    console.log("you must be 19+ to enter");
}


// with boolean  
let isStudent = false;

if(isStudent) {
    console.log("you are a student")
}
else {
    console.log("you are not a student")
}


// nasted if statements 
let age = 18;
let hasLicense = false;
let desired = true;

if(age >= 16) {
    console.log("you are old enough to drive")
    if(hasLicense){
        console.log("and you have the license!")
    }
    else {
        console.log("and you dont have the license!")
    }
}
else if(desired) {
    console.log("sign in the form then")
}
else {
    onsole.log("you are not old enough to drive")
}


