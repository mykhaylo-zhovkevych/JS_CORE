/*
Catches a ton of bugs and errros at compile time (fact)
makes your code more readable and maintainable (imo)
makes it easier to refactor and scale your codebase (imo)
*/

// tsc converts ts to js

// Primitive types
let age: number = 20;
let name: string = "Myk";
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Other types

// Discriminated Unions vs In Checks and type predicates
type ImageAttachment = {
    fileSize: number;
    width: number;
    height: number;
};

type DocumentAttachment = {
    fileSize: number;
    numPages: number;
}

type FileAttachment  = {
    fileSize: number;
};

export type Attachment = ImageAttachment | DocumentAttachment | FileAttachment;

export function processAttachment(attachment: Attachment) {
    if ("width" in attachment ) {
        return "Attached image, size: " + attachment.fileSize;
    }
    if ("numPages" in attachment) {
        return `Attached document, size: ${attachment.fileSize}`;
    }
    return `Attached document, size ${attachment.fileSize}`;
}

type ModelSkippity = {
    version: "3.5" | "4" | "4s";
    search: boolean;
};

type ModelJean = {
    version: "2" | "3" | "3.14";
    think: boolean;
};

export type Model = ModelSkippity | ModelJean;

function isModelSkippity(model: Model): model is ModelSkippity {
    return "search" in model && (model.version === "3.5" || model.version === "4" || model.version === "4s");
}

function isModelJean(model: Model): model is ModelJean {
    return (
        "think" in model && (model.version === "2" || model.version === "3" || model.version === "3.14")
    )
}

// as keyword
// is used to assert a type when i know more about the type than the compiler does(100% of certainty)
export type OrderData = {
    id: string;
    accoountType: "free" | "premium";
    amount: number;
    contact: {
        email: string;
        phone: string;
    };
};

let a: string | number

// type narrowing might be more practical
if (typeof a == "string")
(a as string).toLowerCase()

export function handleSuccessfulOrder(orderResponse: unknown): string {
    const {accountType, contact} = orderResponse as OrderData;

    /*
    Important: as OrderData only affects TypeScript checking, not runtime validation. 
    If orderResponse is missing those fields at runtime, it can still crash.
    */
    let welcome: string;
    switch (accountType) {
        case "free":
            welcome = "Welcome to the free plan!";
            break;
        case "premium":
            welcome = "Welcome to the premium plan!";
            break;
        default:
            throw new Error(`Unknown account type: ${accountType}`);
    }
    return `${welcome} We will contact you at ${contact.email}`;

}

// Non-null assertion operator !
sendText(cleanedText!); // this mean that i am sure that cleanedText is not null or undefined, so it can be safely used here