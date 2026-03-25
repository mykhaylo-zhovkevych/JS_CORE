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