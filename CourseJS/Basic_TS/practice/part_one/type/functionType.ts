export function calculateTotal(
    price: number,
    quantity: number,
    discount: number,
    // by assigning a number the ts assumps that the all types are number
) : undefined {
    return price * quantity * (1 - discount);
}

function devide(a: number, b: number) {
    return a / b;
}

// result is inferred as a number
// retuns very specific type and more narrow
/*
    function getMessage(isAdmin: boolean) {
    if (isAdmin) {
        return "Welcome, admin!";
    }
    return "Welcome, user!"; 
}
*/
const result = devide(10, 2);

// explicit return type
// if complex or intended return expected. better declare it rathern than relying on inference
function devide02(a: number, b: number) : number {
    return a / b;
}

// By default in ts function returns undefined if no return statement is provided
// so the void should be used
export function logSystemEvent(event: string, severity: "info" | "warning" | "error") : void { 
    console.log(`System${severity.toUpperCase()}: ${event}`);
}

// passing functions into functions can be long so there is a type alias
type LoggerCallback = (s1: string, s2: string) => string;
function setLoggerTimeout(
    loggerCallback: (s1: string, s2: string) => string, delay: number, ( 
    ) {
        // code here
}

// Example
type Operation = (x: number, y: number) => number;
// When it gets complex -> you extract the function type
function calculate(a: number, b:number, op: Operation): number {
    return op(a,b);
}