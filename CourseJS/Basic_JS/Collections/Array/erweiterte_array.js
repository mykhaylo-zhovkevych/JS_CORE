// 3. Iterating Over an Array
let fruits = ['Apple', 'Banana', 'Cherry'];

/* 
The for loop is one of the most basic and commonly used loops. 
It allows you to iterate over a sequence of values by using an index. 
The for loop is very flexible and can be used with any iterable structure, such as arrays, strings, or even custom iterables. 
*/
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
    console.log(" ");
}

/* 
The forEach loop is a method that is available on arrays in JavaScript. 
It allows you to execute a provided function once for each array element.
 It's a more concise way to iterate over arrays compared to the for loop, 
 but it's slightly less flexible since you can't easily break out of the loop or skip iterations.
*/
fruits.forEach(function(fruit) {
    console.log(fruit);
});
console.log(" ");


/*  
The for...of loop is used to iterate over the values of an iterable object, such as arrays, strings, maps, sets, and more. 
It’s a simpler and more modern alternative to the for loop when you only need to access the values directly.
*/
for (let fruit of fruits) {
    console.log(fruit);
}

/*
 the for...in loop is also commonly used in JavaScript, 
 primarily for iterating over the properties of an object. 
 However, it can be used on arrays, though it's generally not recommended for that purpose because it iterates over all enumerable properties, 
 not just array elements.
*/
let person = { name: 'Alice', age: 25, city: 'Berlin' };

for (let key in person) {
    console.log(key + ': ' + person[key]);
}


// The while loop repeats a block of code as long as the specified condition is true. 
// It’s great when you don't know how many times you need to loop in advance.

let i = 0;
while (i < 5) {
    console.log(i);  // Outputs: 0, 1, 2, 3, 4
    i++;
}

// The do...while loop is similar to the while loop, 
// but it guarantees that the code block runs at least once before the condition is tested.

let j = 0;
do {
    console.log(j);  // Outputs: 0, 1, 2, 3, 4
    j++;
} while (j < 5);

/*
break and continue Statements

break: Exits the loop entirely.
continue: Skips the current iteration and moves to the next one.
*/

for (let i = 0; i < 5; i++) {
    if (i === 3) {
        break;  // Exits the loop when i is 3
    }
    process.stdout.write(i.toString() + ' ');  // Outputs: 0, 1, 2
}

console.log("");

for (let i = 0; i < 5; i++) {
    if (i === 3) {
        continue;  // Skips the iteration when i is 3
    }
    process.stdout.write(i.toString() + ' ');  // Outputs: 0, 1, 2, 4
}






