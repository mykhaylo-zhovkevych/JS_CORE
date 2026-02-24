## Language spec

### Weak Typing
It shows that JavaScript automatically converts types (type coercion).

``` js
console.log(10 + "2")   // "102"
console.log(10 * "2")   // 20
console.log("10" / 2)   // 5
console.log("5" + 2)    // "52"
```
This is called implicit type coercion
It can lead to bugs because the behavior changes depending on operator.

``` js
console.log(100500 == "100500")  // true
console.log(100500 === "100500") // false
```
== → converts types before comparing
=== → strict comparison (no conversion)

``` js
const arr = [5, "10", {}, []]
``` 
One array can hold anything:
    number
    string
    object
    array


### Dynamic Typing
Type is determined at runtime, not at compile time.

``` js
let variable = 5;
variable = "5";
variable = { username: "Petr" };
```

The same variable becomes:
    number
    string
    object
JS allows this

``` js
function fn(data) {
  if (data) {
    return "string"
  } else {
    return 777;
  }
} 
```
This function sometimes returns:
    string
    number


#### Now - How TypeScript Fixes This
TS addes Static typing (at compile time)


Example 1 — Variable types
JS
``` js
let variable = 5;
variable = "hello"; // Allowed
```
TS
``` ts
let variable: number = 5;
variable = "hello"; // Error
```

Example 2 — Function return types
JS
``` js
function fn(data) {
    if (data) return "text";
    return 777;
}
```

TS
``` ts
function fn(data: boolean): string {
    if (data) return "text";
    return 777; // Error
}   
```
Now return type must be consistent.

Example 3 — Array types
JS
``` js
const arr = [5, "10", {}, []];
```

TS
``` ts
const arr: number[] = [5, 10]; // only numbers allowed

// or
const arr: (number | string)[] = [5, "10"];

```
I must define allowed types explicitly

---

#### In TypeScript (and type theory in general):
A type is the set of all possible values that can belong to it.

Example 1 — Simple Type
``` ts
let x: number; 
```
What is number?
It is the set of all numbers:
``` ts
number = { … -2, -1, 0, 1, 2, 3.14, 100, … }
```

Example 2 — Literal Types
``` ts
type Direction = "left" | "right";

let d: Direction;

d = "left"; 
d = "right";
d = "up"; // error not in the set

```

Instead of thinking:
"Type is a label"

Think:
"Type defines which values are allowed to exist here."


![alt text](image.png)

1️ Primitive Types (Примитивы)
Basic built-in value types:
``` ts
number
string
boolean
bigint
symbol
null
undefined
```

2️ Literal Types
Very specific exact values.
``` ts
type Color = "red" | "green";
```

3 Union & Intersection Types
Union (A | B)
Value can be one of several types.
``` ts
type ID = string | number; 
```
Intersection (A & B)
Value must satisfy both types.
``` ts
type A = { name: string };
type B = { age: number };

type Person = A & B;
```

4️ Generic Types
Reusable, parameterized types.
``` ts
function identity<T>(value: T): T {
  return value;
}
```
T is a placeholder type.

_Code example:_

``` ts
interface MetaData {

}

interface User {
  username: string;
}

interface Article {
    title: string;
}

interface ApiResponse<T> {
  status: 'error' | 'success';
  meta: MetaData;
  requestId: string;
  data: T;
}

const response: ApiResponse<User> {
  status: 'success',
  meta: {},
  requestId: 'req-user-001',
  data: {
    username: 'staff_user',
  },
}

const responseFromArticleApi: ApiResponse<Article> = {
  status: 'success',
  meta: {},
  requestId: 'req-article-001',
  data: {
    title: 'TypeScript Basics',
  },
}

type isArray<T> = T extends any[] ? true : false;

const first:isArray<string> = false;
const secound:IsArray<string[]> = true;

```


5️ Composite Types
These are structured types:
    Objects
    Arrays
    Tuples
    Functions

``` ts
type User = {
  name: string;
  age: number;
};

let numbers: number[] = [1, 2, 3];

type Point = [number, number];
```
These combine primitive or other types.


6️ Special Types
`any`
- Anything allowed
- Turns off type checking

``` ts
let value: any;
value = 4;
value = []
value = {}

function logData(data: any) {
    console.log(data)
}
```

`unknown`
- Anything possible
- But must be checked before use

`never`
- No possible values
- Represents impossible state

`void`

---

_Object can be defined with two way._
Using the type and interface 

``` ts
interface Address {
  city?: string;
  street?: string;
  corrds: number[]
}

type User = {
  firstname?: string;
  age?: number;
  address: Address;
}

const user: User = {
  address: {
    cooreds: [5,5]
  }
}

type ComponentProps = {
  className: string,
  color: 'red' | 'green'
}

type ApiResponse = {
  status: 'seccess' | 'error';
  data?: T;
}
```


