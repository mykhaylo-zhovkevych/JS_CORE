// Number Guessing Game

const minNum = 1;
const maxNum = 100;
// Math.random() will generat random number from 0 up to 1 
const answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
/* for terminal show
console.log(answer); */

let attempts = 0;
let guess;
let running = true;

while(running == true) {

    guess = window.prompt(`Guess a number between ${minNum} - ${maxNum}`)
    guess = Number(guess);
    console.log(typeof guess, guess);
    // pre-build function tath look if something not a number 
    if(isNaN(guess)) {
        window.alert("Please enter a valid number");
    }
    else if(guess < minNum || guess > maxNum) {
        window.alert("Please enter a valid number");
    }
    // here the valid will be processed
    else {
        attempts++;
        if(guess < answer) {
            window.alert("TOO LOW! TRY AGAIN");

        }
        else if(guess > answer) {
            window.alert("TOO HIGH! TRY AGAIN");
        }
        else {
            window.alert(`CORRECT! the answer was ${answer}. it took you ${attempts} attemps.`);
            running = false;
        }
    }
}

