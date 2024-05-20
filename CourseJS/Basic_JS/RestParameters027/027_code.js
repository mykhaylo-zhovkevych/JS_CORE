//Rest parameters allow a function to accept an indefinite number of arguments as an array. 
//This is particularly useful when you don't know how many arguments will be passed to the function.

// this function is designed to accept any numbers of arguments

                    //rest
function openFridge(...foods) {
                //spread
    console.log(...foods);
}

function getFood(...foods) {
    return foods;
}

const food1 = "pizza";
const food2 = "hamburger";
const food3 = "hotdog";
const food4 = "sushi";

openFridge(food1,food2, food3, food4);

const foods = getFood(food1, food2, food3, food4);
console.log(foods);


// secound example

function sum(...numbers){
    let result = 0;
    for(let i of numbers){
        result += i;
    }
    return result;
}

// this sum creates the array of numbers than it tkaes it and loops by adding it toghether and than it returns it as the let result
const total = sum(1,667);
console.log(`Your total is $${total}`);


function getAverage(...numbers){
    let result = 0;
    for(let i of numbers){
        result += i;
    }
    // here it finds the average
    return result/ numbers.length;
}

const totalA = getAverage(75, 100, 200);
console.log(totalA);



// third example

function combineStrings(...strings) {
    return strings.join(" ");
}

const fullNanme = combineStrings("Mr.","Spongebob","Squarepants","!!!");
console.log(fullNanme);