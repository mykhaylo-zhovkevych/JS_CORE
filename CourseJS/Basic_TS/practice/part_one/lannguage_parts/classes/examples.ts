/**
 * Classes in Ts work mostly the same way that they do in js, but with the added benefit of
 * static typing. 
 * 
 */

class Hero {
    firstname: string;
    lastname: string;
    health: number;

    constructor(firstname: string, lastname: string, health: number) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.health = health;
    }

    attack(damage: number): void {
        console.log(`${this.firstname} attacks for ${damage} damage!`);
    }

    getFullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }
    getHealth() {
        return this.health;
    }
}

//private memebers
export class Customer {
    firstName: string;
    lastName: string
    #balance: number;
    //private balance

    constructor(firstName: string, lastName: string, balance: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.#balance = balance;
    }
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    purchase(cost: number) {
        this.#balance = this.#balance - const;
        return this.#balance;
    }
}

// Abstract classes in ts are not widely used but there is some use cases
export abstract class Customer {
    firstName: string;
    lastName: string;
    protected balance: number;

    constructor(firstName: string, lastName: string, balance: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.balance = balance;
    }
    
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

export class RegularCustomer extends Customer {
    constructor(firstName: string, lastName: string, balance: number) {
        super(firstName, lastName, balance);
    }
    getBalance(): number {
        return this.balance;
    } 

}

// Utility Types
export interface ContactInfo {
    email?: string;
    phoneNumber?: string;
}
export function addBillingInfo(info: Required<ContactInfo>) {
    return `Billing info added: ${info.email}, ${info.phoneNumber}`;
}

addBillingInfo({ email: "ewef@example.com", phoneNumber: "123-456-7890" });