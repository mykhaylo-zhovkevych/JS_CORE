// array
let fruits = ["apple", "orange", "banana"];

console.log(fruits[0]);
console.log(fruits[1]);
/* console.log(fruits); */

// is overwriting the existing element
fruits[2] = "coconut";

// pushing a new element to the array.
fruits.push("pineapple");

//this will remove the last element  
fruits.pop();

// will add tothe beginning of the array
fruits.unshift("mango");

// to remoce the ellemt from the beginning
fruits.shift();

// length property
let numOffFruits = fruits.length;
console.log(numOffFruits);
// look and gives the representative index and if not finding will give -1
let index = fruits.indexOf("apple");
console.log(index);


// easy way of looping trough the elements this loop gives some flexibility for me
for(let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// enhanced for loop 
for(let i of fruits) {
    console.log(i);
}


// it will sort the content in the alphabetical order
fruits.sort();
// do opisite
fruits.sort().reverse();

