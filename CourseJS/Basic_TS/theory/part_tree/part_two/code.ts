const Role = {
    ADMIN: 'admin',
    USER: 'user',
} as const;

type Role = typeof Role[keyof typeof Role];

// Composite type
type User = { id: number; name: string; role: Role; email: string};

function isUser(x: unknown): x is User {
    if (typeof x !== "object" || x === null) {
        return false;
    }
    const o = x as Record<string, unknown>;
    return (
        typeof o.id === "number" &&
        typeof o.name === "string" &&
        (o.role === Role.ADMIN || o.role === Role.USER) &&
        (o.email === undefined || typeof o.email === "string")
    );
}

function getByKey<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

function greet(input: unknown) {
    if (!isUser(input)) return "Unvalid User!";

    const emailLower = input.email?.toLowerCase();

    if (typeof input.name === "string") {
        if ("email" in input && input.email) {
            return `Hi ${input.name}, email: ${emailLower}`;
        }
        return `Hi ${input.name}`; 
    }
    return "Unknown";
}

const raw: unknown = JSON.parse(`{"id":1,"name":"Petr","role":"admin"}`);
 
console.log(greet(raw));

if (isUser(raw)) {
    const n = getByKey(raw, "name");
    console.log(n.toUpperCase());
}
