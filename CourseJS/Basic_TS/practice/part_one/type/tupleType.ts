// Tuples in ts still arrays under the hood. 
// let t: [numberm string] = [1, "hi"];
// t[0] = 99 // ok
// t[2] = true // type error

const nameAndAge: [string, number] = ["Martha Jones", 30];
nameAndAge.push("extra"); // this is allowed but it can lead to runtime errors
nameAndAge.push(42); // this is also allowed but it can lead to runtime errors
// the readonyl is recommanded to use


// Tuple = fixed positions (order matters)
// Object = named properties (names matter)
type UserTuple = [string, number];

const user: UserTuple = ["Alice", 30];
console.log(user[0]);
console.log(user[1]);

type UserObject = {
    name: string;
    age: number;
};
const user02: UserObject = {
    name: "Max",
    age: 23
};
console.log(user02.name);
console.log(user02.age);
/*
 * use tuple when small, fixed stracture. position is obvious 
 * use object where data has meaning. more readble/scalable
 */

export function tokenize(input: string): [number, ...string[]] {
   const values = input.split(" ");
   return [values.length / 100, ...values]; 
}

// Type narrowing
type PremiumCustomer = {
    plan: "premium";
    tickets: number;
};

type RegularCustomer = {
    plan: "regular";
    tickets: number;
    aboveLimit: boolean;
};

export type Customer = RegularCustomer | PremiumCustomer;

export function openTicket(customer: Customer): number {
    if (customer.plan === "regular" && customer.aboveLimit) {
        return -1;
    }
    return customer.tickets + 1;
}

// `unknown`
// literally means that i dont know what the type is, but it is very restrictive and forces me to do type checking before using it

export type CustomerMessage = {
    content: string;
    source: "chat" | "email" | "unknown";
}

let a: unknown
let b: any

a.toLowerCase(); // error
b.toLowerCase(); // ok but can lead to runtime error

// In order to be able to use the a. type narrowing must be executed
if (typeof a === "string") {
    a.toLowerCase();
}

// Example
type CustomerMessage02 = {
    content: string;
    source: "chat" | "email" | "unknown";
};

// safer wrapper 
function parseJson(text: string): unknown {
    return JSON.parse(text);
}

function isCustomerMessage(value: unknown): value is CustomerMessage02 {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const obj = value as Record<string, unknown>;
    // { [key: string]: unknown }

    return (
        typeof obj.content === "string" && 
            (obj.source === "chat" || 
            obj.source === "email" || 
            obj.source === "unknown")
    );
}

const raw = `{"content":"Hello, I need help", "source":"chat"}`;

try {
    const data = parseJson(raw);

    if (isCustomerMessage(data)) {
        console.log(data.content.toLowerCase()); 
        console.log(data.source);
    }
    else {
        console.log("Parsed JSON, but it is not a valid CustomerMessage");
    }
}

catch {
    console.log("Failed to parse JSON");
}

// ---
function parseJsonUnsafe(text: string): any {
  return JSON.parse(text);
}
const data = parseJsonUnsafe(`{"content":123,"source":"chat"}`);
// compiles, but may crash at runtime because content is not a string
console.log(data.content.toLowerCase());

