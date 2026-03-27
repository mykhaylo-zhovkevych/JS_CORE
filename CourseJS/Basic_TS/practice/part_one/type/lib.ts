// Conditional type 
// is used to create a new type based on a condition that depends on another type

type IsString<T> = T extends string ? "Yes" : "No";

type Result1 = IsString<"hello">; // true
type Result2 = IsString<42>; // false


export type SentimentString<T> = T extends { angry: true } ? "mad" | "furrious" : "happy" | "content"; 

// index signature
type Usermetrics = {
    [key: string]: number;
};

// mapped types
type Soldier = {
    name: string;
    age: number;
    branch: "garrison" | "military police" | "recon";
}

type OptionalSoldier = {
    [K in keyof Soldier]?: Soldier[K];
    // Generic type that take type paramter of Soldier
}