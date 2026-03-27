/**
 * generics are one of ts most powerful features.
 * they allow to create reusable logic that works with many types rather than a single one
 * Think of a data structure like Queue or a Stack. They can hold any tape of data, so it would be really 
 * annoying to reimplemnt them for every type.
 * 
 */

export function getFirst<T>(arr: T[]): T | undefined {
    return arr[0];
}

const value = getFirst([1,2,3]);

export function pair<A, B>(a: A[], b: B[]): [A, B][] {
    const array: [A,B][] = [];
    for (let i = 0; i < a.length && i < b.length; i++) {
        array.push([a[i], b[i]]);
    }
    return array;
}

// Generic constraints
export function pluckEmails<T>(arr: T[]) {
    return [];
}

// this at least means the type T keybaord
interface HasCost {
    cost: number;
}
function applyDiscount<T extends HasCost>(vals: T[], discount: number): T[] {
    const arr: T[] = [];
    for (const val of vals) {
        val.cost *= discount;
        arr.push(val);
    }
    return arr;
}

class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }
    setValue(newValue: T): void {
        this.value = newValue;
    }
}

const nameBox = new Box<string>("Hello");
nameBox.setValue("World");
console.log(nameBox.getValue());

const numberBox = new Box<number>(42);
numberBox.setValue(100);
console.log(numberBox.getValue());