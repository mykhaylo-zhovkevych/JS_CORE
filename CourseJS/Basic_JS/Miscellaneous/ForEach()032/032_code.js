/* forEach() method used to iterate over the elements
             of an array and apply a specified function (callback)
             to each elemnt 

             array.forEach(callback)
             elemnt, index, array are provided

 */

let numbers = [1,2,3,4,5];

numbers.forEach(square);
numbers.forEach(display);


function double(element, index, array) {
    array[index] = element * 2;
}

function square(element, index, array) {
    array[index] = Math.pow(element, 2);
}

function display(element, index, array) {
    console.log(`Element: ${element}, Index: ${index}, Array: ${array}`);
}

// example 02

let fruits = ["apple", "orange", "banana", "coconut"];

fruits.forEach(capitalize);
fruits.forEach(projizieren);

function upperCase( elemnt, index, array) {
    array[index] = elemnt.toUpperCase();
}

function lowerCase( elemnt, index, array) {
    array[index] = elemnt.toLowerCase();
}

function capitalize(elemnt, index, array) {
    array[index] = elemnt.charAt(0).toUpperCase() + elemnt.slice(1);
}


function projizieren(elemnt, index, array) {
    console.log(elemnt, index, array);
}