// 3. Iterating Over an Array
let fruits = ['Apple', 'Banana', 'Cherry'];

// Using a for loop
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
    console.log(" ");
}

// Using forEach
fruits.forEach(function(fruit) {
    console.log(fruit);
});
console.log(" ");

// Using for...of loop
for (let fruit of fruits) {
    console.log(fruit);
}

// 