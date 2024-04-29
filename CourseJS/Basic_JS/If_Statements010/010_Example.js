const myText = document.getElementById("myText");

const mySubmit = document.getElementById("mySubmit");

const resultElement = document.getElementById("resultElement");

let age;



mySubmit.onclick = function(){



    age = myText.value;

    age = Number(age);

    /* 
        age = myText.value;
        This line retrieves the value entered in the myText input field and assigns it to the variable age. Initially, this value is a string type because all input values retrieved from HTML forms are strings by default.
        age = Number(age);
        This line converts the string value of age to a number. This is necessary because the subsequent logic involves numerical comparisons (like checking if the age is greater than or equal to 18), which require age to be a number rather than a string.
    */
    
    /* textContent is a property that gets or sets the text inside an HTML element. It includes the text within all of its child elements, but it ignores any HTML tags. This means it only deals with the visible text, not the HTML structure. */

    if(age >= 100){

        resultElement.textContent = `You are TOO OLD to enter this site`;

    }

    else if(age == 0){

        resultElement.textContent = `You can't enter. You were just born.`

    }

    else if(age >= 18){

        resultElement.textContent = `You are old enough to enter this site`

    }

    else if(age < 0){

        resultElement.textContent = `Your age can't be below 0`;

    }

    else{

        resultElement.textContent = `You must be 18+ to enter this site`;

    }

}