// SWITCH -- can be an efficient replacement to many else if statements

let day = 2;

switch(day) {
    case 1 : 
        console.log("it is Monday");
        break;
    case 2 : 
        console.log("it is Tuesday");
        break;
    case 3 : 
        console.log("it is Wednesday");
        break;
    case 4 : 
        console.log("it is Thursday");
        break;
    case 5 : 
        console.log("it is Friday");
        break;
    case 6 : 
        console.log("it is Saturday");
        break;
    case 7 : 
        console.log("it is Sunday");
        break;
    default: 
        console.log(`${day} is not a day`);

}


let testScore = 92;
let letterGrade;

switch(true) {
    case testScore >= 90: 
        letterGrade = "A";
        break;
    case testScore >= 80:
        letterGrade = "B";
        break;
    case testScore >= 70:
        letterGrade = "C";
        break;
    case testScore >= 60:
        letterGrade = "B";
        break;
    default: letterGrade = "F";
        break;

}

console.log(letterGrade);
