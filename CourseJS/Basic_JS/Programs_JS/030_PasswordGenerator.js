function generatePassword(length, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols) {

    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyzt";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$^$*()_+-="

    let allowedChars = "";
    let password = "";

    // this look if it is ture or false 
    allowedChars += includeUpperCase ? lowerCaseChars : "";
    allowedChars += includeLowerCase ? upperCaseChars : "";
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSymbols ? symbolChars : "";

   /*  console.log(allowedChars); */
   if(length <= 0 ) {
     return `(password length must be at least 1)` 
   }
   if(allowedChars.length === 0) {
    return `(At least 1 set of characters needs to be selected)`; 
   }
   // random character will be selected from the choices that user makes 

   for(let i = 0; i <length; i++) {
                            // here will be given a random number between the 0 and 25
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        // the random choosen characters from the String will be concutinated
        password += allowedChars[randomIndex];
   }

return password;
}

const passwordLength = 7742;
const includeLowerCase = true;
const includeUpperCase = true;
const includeNumbers = true;
const includeSymbols = true;

const password = generatePassword(passwordLength,includeLowerCase, includeUpperCase, includeNumbers, includeSymbols );


console.log(`Generated password: ${password}`);