/* .map() = accepts a callback and applies that function 
            to each elemnt of an array, then return a new array

*/


const numbers = [ 1,2,3,4,5];
const squares = numbers.map(square);
const cubes = numbers.map(cube);

console.log(squares)

function square(elemnt) {
    return Math.pow(elemnt, 2)
}

function cube(elemnt) {
    return Math.pow(elemnt, 3)
}

// example 02

const students = ["mz", "ptaxa","goof","scriptonit"];
const studentsUpper = students.map(upperCase);

console.log(studentsUpper);

function upperCase(elemnt) {
    return elemnt.toUpperCase();
}

function lowerCase(elemnt) {
    return elemnt.toLowerCase();
}

// example 03

const dates = ["2024-1-10", "2025-2-20", "2026-3-30"];
const formattedDates = dates.map(formatDates);

console.log(formattedDates);

function formatDates(element) {
    const parts = element.split("-");
    return `${parts[1]}/${parts[2]}/${parts[0]})`;
}











