// Intro


function sum(a: number, b: number): number {
    return a + b;
}

//console.log(sum(10, 20));

type Lazy<T> = () => T;



function lazySum(a: Lazy<number>, b: Lazy<number>): Lazy<number> {
    return () => a() + b();
}

//console.log(lazySum(() => 10 + 5, () => 20)());



// Avoiding big computations that are not needed
function lazyFirst(a: Lazy<number>, b: Lazy<number>): Lazy<number> {
    return a;
}
function hang<T>(): T {
    return hang();
}

function first(a: number, b: number): number {
    return a;
}


console.log(lazyFirst(() => 10, () => hang())());
//console.log(first(10, hang()));


// If frist is false, then the it will not compute/run
function and(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
    return () => !a() ? false: b();
}


function trace<T>(x: Lazy<T>, message: string): Lazy<T> {
    return () => {
        console.log(message);
        return x();
    }
}
console.log("false && false ==", and(trace(()=> false, "L"), trace(() => false, "R"))());
console.log("true && false ==", and(trace(()=> true, "L"), trace(() => false, "R"))());
console.log("true && true ==", and(trace(()=> true, "L"), trace(() => true, "R"))());
console.log("false && true ==", and(trace(()=> false, "L"), trace(() => true, "R"))());


function or(a: Lazy<boolean>, b: Lazy<boolean>): Lazy<boolean> {
    return () => a() ? true: b();
}

console.log("---".repeat(3));

console.log("false || false ==", or(trace(()=> false, "L"), trace(() => false, "R"))());
console.log("true || false ==", or(trace(()=> true, "L"), trace(() => false, "R"))());
console.log("true || true ==", or(trace(()=> true, "L"), trace(() => true, "R"))());
console.log("false || true ==", or(trace(()=> false, "L"), trace(() => true, "R"))());

type LazyList<T> = Lazy<{
    head: Lazy<T>,
    tail: LazyList<T>
} | null>;

function toList<T>(xs: T[]): LazyList<T> {
    return () => {
        if (xs.length === 0) {
            return null;
        } else {
            return {
                head: () => xs[0],
                tail: toList(xs.slice(1))
            };
        }
    };
}

//console.log(toList([1, 2, 3])()?.tail()?.head());


// recursive generation of the infinite list of numbers until specified
function range(begin: Lazy<number>): LazyList<number> {
    return () => {
        let current = () => begin();
        return {
            head: current,
            tail: range(() => begin() + 1)
        }
    }
}

//console.log(range(() => 10)()?.tail()?.head());

function printList<T>(xs: LazyList<T>) {
    let pair = xs();
    while (pair !== null) {
        console.log(pair.head());
        pair = pair.tail();
    }
}

console.log("---".repeat(3));

//printList(toList([1, 2, 3]));
//printList(range(() => 3));


function take<T>(n: Lazy<number>, xs: LazyList<T>): LazyList<T> {
    return () => {
        let m = n();
        if (m > 0) {
            const pair = xs();
            if (pair === null) {
                return null;
            }
            return {
                head: pair.head,
                tail: take(() => m - 1, pair.tail)
            }
        } else {
            return null;
        }
     
    };
}


console.log("---".repeat(3));
printList(take(() => 5, range(() => 3)));


function filter<T>(f: (arg0: T) => boolean , xs: LazyList<T>): LazyList<T> {
    return () => {
        let pair = xs();
        if (pair === null) {
            return null;
        } else {
            // predicate & forcing
            let x = pair.head();
            if (f(x)) {
                return {
                    head: () => x, 
                    tail: filter(f, pair.tail)
                }
            } else {
                return filter(f, pair.tail)();
            }
        }
    }
} 

//printList(filter(x => x % 2 === 0, range(() => 3)));
console.log("---".repeat(3));
printList(take(() => 10, filter((x) => x % 2 === 0, range(() => 1))));
