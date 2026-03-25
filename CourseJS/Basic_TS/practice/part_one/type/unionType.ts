// type narrowing lets me narrow down the type of a variable within a specific block of code

export function safeSquare(val: string | number): number {
    if (typeof val === "string") {
        val = parseInt(val, 10);
    }
    // now val is only a number
    return val * val;
}

/**
 * Process both Id and the ticket name
 * like 42: "SUPPORT-123"
 */
export function getTicketInfo(id: string | number) {
    if (typeof id === "string") {
        const parsedId = id.split("-")[1];
        const numberId = parseInt(parsedId);
        return `Processing ticket: ${numberId}`;
    }
    return `Processing ticket with ID: ${id}`;
}

// Optional Parameters

function greet(name: string, title?: string): string {
    if (title) {
        return `Hello, ${title} ${name}!`;
    }
    return `Hello`
}

greet("Grandalf"); // "Hello, Gandalf"
greet("Gandalf", "Wizard"); // "Hello, Wizard Gandalf"

// Default Parameter
// this default value also mean that the parameter is optional
function newCharacter(name: string, role: string = "Adventurer"): string {
    return `${name} is a ${role}`;
}

console.log(newCharacter("Gandalf"));
// Gandalf is a warrior

console.log(newCharacter("Gandalf", "Wizard"));
// Gandalf is a wizard


// Literal types
/*
 * They allow define not just the type of a variable but also the exact value it can hold  
 * 
 */

export type Priority = "low" | "medium" | "high" | "critical";

export function setPriority(level: Priority) {
    switch (level) {
        case "low": 
            return 0
        case "medium":
            return 1
        case "high":
            return 2
        case "critical":
            return 3
        default:
            throw new Error("Invalid priority level");
    }
}