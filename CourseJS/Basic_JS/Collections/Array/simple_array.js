// 1. Creating and Accessing Arrays
let fruits = ["Apple", "Banana", "Cherry"];

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);

// 2. Adding and Removing Elements

let obst = ["Apple", "Banana"];

obst.push("Cherry");
console.log(obst);

let lastFruit = obst.pop();
console.log(lastFruit); // Outputs: "Cherry"
console.log(obst); // Outputs: ["Apple", "Banana"]

obst.unshift("Mango");
console.log(obst);

let firstFruit = obst.shift();
console.log(firstFruit);
console.log(obst);


// erweiterte zufügung und löschung 

let fruits02 = ['Apple', 'Banana', 'Cherry', 'Date'];

console.log(" |zufügung| |und| |löschung| ");
console.log(fruits02);
// Remove the element at index 2 ('Cherry')
let removedFruit = fruits02.splice(2, 1);

console.log(removedFruit); // Outputs: ["Cherry"]
console.log(fruits02); // Outputs: ["Apple", "Banana", "Date"]


console.log(" ");
let fruits03 = ['Apple', 'Banana', 'Cherry', 'Date'];

// Insert 'Blackberry' at index 2 without removing any elements
fruits03.splice(2, 0, 'Blackberry');

console.log(fruits03); // Outputs: ["Apple", "Banana", "Blackberry", "Cherry", "Date"]