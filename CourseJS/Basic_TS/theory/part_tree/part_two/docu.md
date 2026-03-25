## Secound Part

### Narrowing of the types
Reducing a broad type into a more specific type based on runtime checks.

``` ts
// First way
function fn(arg: number | string | null) {
    if(typeof arg === 'number') {

        // All methods for number arg.
        arg
        return

    } else if (typeof arg === 'string') {
        arg
        return
    }
}

// Secound Way
function fn2(arg: number | string | null, arg2: number) {
    if (arg === null) {
        arg
    }
    if (arg === arg2) {

    }
    return arg;
}

interface User {
    username: string;
    age: number;
}

interface Person {
    lastname: string;
    firstname: string;
    age: number;
}

function fn3(arg: User | Person) {
    // inside of here the type get narrowed
    if ('username' in arg) {
        arg
    }

    // but outside it stays the same 
    arg
}

// Another example with classes

class Bmw {
    bmwDrive() {

    }
}

class Audi {
    audiDrive() {

    }
}

const bmw = new Bmw();
const audi = new Audi();

function fn4(arg: Bmw | Audi) {
    if (arg instanceof Bmw) {
        arg.bmwDrive()
    }
    else {
        arg.audiDrive()
    }
}

```

### Type Guards

``` ts
interface Car {
    maxSpeed: number;
    width: number;
}

interface BMW extends Car {
    type: 'bmw';
}

interface Person {
    age: mumber;
    name: string;
}

function isBmw(value: BMW ): value is BMW {
    return value.type === "bmw";
}

// value: BMW | AUDI ...
function isCar(value: Car | Person): value is Car {
    return 'maxSpeed' in value && 'width' in value;
}

function isPerson(value: Car | Person): value is Person {
    return 'age' in value && 'name' in value;
}


function fn(data: Car | Person ) {
    if (isCar(data)) {
        data.maxSpeed
    }
    // Here will be Person Union
    else {
        data.person
    }
}

```


### Type Conversion

``` ts
interface Person {
    age: number;
    username: string;
    pawword: string;
}

// The Ts dont throws a runtime error because I manully cast it ot the Person type
const obj = {
    age: 25,
    username: 'Ulbi TV'
} as Person

```

### Typeof and keyof

In TypeScript (not runtime JS usage), typeof lets you extract the type from an existing value.
``` ts
const user = {
    id: 1, 
    name: "Alex",
    isAdmin: false
};

type User = typeof user;

//now user becomes 
// type User = {
// id: numberM
// name: string;
// isAdmin: boolean;
//}
// typeof user converts a value shape into a type.

// Case with the functions
function getData(user: Person): number {
    return 6;
}

// retuns whole info the type of the function and its arguments
type GetDataFn = typeof getData;

type GetDataReturnValue = ReturnType<typeof getData>
type GetDataParams = Parameters<typeof getData>

```
This is very useful when you want your type to automatically match your object.

`Keyof` — Get the Keys of a Type
it returns a union of property names.

``` ts
type User = {
    id: numberM
    name: string;
    isAdmin: booleanM
};

type UserKeys = keyof User;

// Now type UserKeys = "id" | "name" | "isAdmin";
// It creates union of string literal keys.

// Another case

const obj = {
  name: "Petr",
  age: 20,
  isAdmin: false,
};

type PersonKey = keyof typeof obj;

//: T[K] gets the type of the property represented by K
function getByKey<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const a = getByKey(obj, "name");    // a: string
const b = getByKey(obj, "age");     // b: number
const c = getByKey(obj, "isAdmin"); // c: boolean

getByKey(obj, "email"); // Error: "email" is not a key of obj


```
--- 

?. -> JS has it
! (non-null assertion) -> JS does NOT have it


### Enums

``` ts
// Makes the obj as a readonly
// values literal types ("red" instead of string)
const Color = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
} as const;


Color.RED;

// It compiles to an object like. But it exists as a special TS construct
enum Color = {
  RED: "red",
  GREEN: "green",
  BLUE: "blue"
}

function setColor(color: Color) {

}

setColor(Color.Blue);

// There is also numeric Enum

```
