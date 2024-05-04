// for loop = repeat some code a LIMITED amount of times

for(let i = 0; i <= 2; i++) {
    console.log(i);
}

for(let i = 0; i <= 2; i++) {
    console.log("Hello");
}

for(let i = 0; i <= 12; i+=2) {
    console.log(`${i}\n`);
}

for(let i = 10; i > 0; i--) {
    console.log(i);
}


for(let i = 1; i <=20; i++) {
    if(i == 13) {
        // with continue a iteration can be skipped 
        // with break it will stop the loop entirely 
        continue;
    }
    else {
        console.log(i);
    }    
   
}