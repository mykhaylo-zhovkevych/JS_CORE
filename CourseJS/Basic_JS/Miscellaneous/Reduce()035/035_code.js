// reduce the elements of an array to single value

/*
The reduce method in JavaScript is used to reduce the elements of an array to a single value. 
This is done by applying a callback function, called the "reducer", to each element of the array, 
accumulating the results into a single output value.
*/

const prices = [5, 23, 1, 1, 2];

// calback (sum)
const total = prices.reduce(sum);

console.log(`$ ${total}`);

function sum(previousElement, nextElement) {
    return previousElement + nextElement;

}

// example 02

const grades = [32,23,34,56,89,24];

const maximum = grades.reduce(getMax);

console.log(maximum);

function getMax(accumulator, element) {
    return Math.max(accumulator, element);
}