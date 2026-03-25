### Difference between type and interface

They Look Similar
Both define object shapes.


Using type
``` ts
type User = {
  id: number;
  name: string;
};
```

Using interface
``` ts
interface User {
  id: number;
  name: string;
}
```

Usage is identical:
``` ts
const user: User = { id: 1, name: "Alex" };
```
So what’s the difference? Well the main differences
is that Extension Syntax and Declaration Merging. And That types can do more.

1. 
Interface -> extends
``` ts
interface Person {
  name: string;
}

interface Employee extends Person {
  salary: number;
}
```

Type -> intersection (&)

``` ts
type Person = {
  name: string;
};

type Employee = Person & {
  salary: number;
};
```


2. Declaration Merging
Interfaces can merge automatically.
``` ts
interface User {
  name: string;
}

interface User {
  age: number;
}

// Now TypeScript treats it as:
{
  name: string;
  age: number;
}
// This is called: Declaration merging


// type cannot do this
type User = { name: string };
type User = { age: number }; // Error

```

3. Type Can Do More
type is more flexible. It can represent:
Union
`type Status = "success" | "error";`

Primitives
`type ID = string | number;`

Tuples
`type Point = [number, number];`

Interface cannot  do that



| Feature / Capability            | `interface` | `type` |
|----------------------------------|-------------|--------|
| Defines object shape             | Yes      | Yes |
| Can define primitive alias       | No       | Yes |
| Can define union types           | No       | Yes |
| Can define intersection types    | No       | Yes |
| Can define tuple types           | No       | Yes |
| Can use conditional types        | No       | Yes |
| Can use mapped types             | No       | Yes |
| Declaration merging              | Yes      | No  |
| Extending other types            | `extends`   | `&`    |
| Best for OOP-style modeling      | Yes      | Possible |
| More flexible overall            | Limited  | Very flexible |
| Preferred for advanced typing    | No       | Yes |


### Mapped Types
Is a types that allow create new types on exsiting ones

``` ts
interface User {
    name: string,
    age: number;
    frinds: Array<string;>
}

// Now i wnat create a new type with optionally fields

type ReadonlyType = {
    // with null:  readonly [Key in keyof T]: T[Key] | null;
    readonly [Key in keyof T]: T[Key];
}

type NewUser = ReadonylType<User>
```

### A Utility Type 

A built-in generic type that helps you transform or reuse existing types.
Instead of rewriting types manually, you modify them using utility types.

They are basically type-level helper functions.

``` ts
type User = {
  id: number;
  name: string;
  email: string;
};

// But I need a version where everything is optional 
// or version with only Id or a version without email

// Partial<T> make types optional
type UpdateUser = Partial<User>;

type UpdateUser = {
  id?: number;
  name?: string;
  email?: string;
};

// Required<T> Makes all properties required
type StrictUser = Required<User>;

// Readonly<T>
type ReadonlyUser = Readonly<User>;

// Record<K, T> creates an object type from keys. 
// there is much more of course
type Role = "admin" | "user";

type RolePermissions = Record<Role, boolean>;
```


### Asserts
asserts condition → does NOT change the type directly
1. asserts condition (does NOT specify a new type)
``` ts
function assertNotNull(value: unknown): asserts value {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
}
```
It removes:
null
undefined
false
0
""
But it does NOT say what exact type it becomes.

2. asserts value is Type (explicit narrowing)

``` ts
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string");
  }
}
```
This explicitly changes the type to string

### Overload signatures(Methjod)
``` ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;

function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

const d1 = makeDate(12345678); // matches overload #1
const d2 = makeDate(5, 5, 5);  // matches overload #2
const d3 = makeDate(1, 3); // ERROR
```