// export type Mail = {
//     from: string;
//     to: string[];
//     subject: string;
//     body: string;
//     urgent: boolean;
// }


export function processEmail(mail: Mail) {
    return `FROM: ${mail.from}
TO: ${mail.to}
SUBJECT: ${mail.urgent ? "[URGENT] " : ""}${mail.subject}
BODY: ${mail.body}`;
}

type Spaceship = {
    name: string;
    speed: number;
};

const falcon = {
    name: "Millennium Falcon",
    speed: 75,
    weapons: 4,
};

function pilot(ship: Spaceship) {
    console.log(`Piloting ${ship.name} at ${ship.speed} lightyears per hour`);
}

pilot(falcon); 
// it will work because of excess property checking, it only checks for the properties that are defined in the type, and ignores the rest
// but if i try to pass an object literal with extra properties, it will give an error because of excess property checking
// like if i pass property that i dont need to
pilot({name: "X-Wind", speed: 75, weapons: 4});


export type Address = {
    name: string
    domain: string
};

export type Mail = {
    from: Address;
    to: Address[];
    subject: string;
    body: string;
    urgent: boolean;
    cc?: Address[];
}

export function processMail(mail: Mail) {
    let addressees = "";
    for (const addressee of mail.to) {
        addressees += `${addressee.name}@${addressee.domain},`;
    }
    addressees = addressees.slice(0, -2);

    let copies = "";
    if (mail.cc) {
        copies = "\nCC: ";
        for (const addressee of mail.cc) {
            copies += `${addressee.name}@${addressee.domain},`;
        }
        copies = copies.slice(0, -2);

        return `FROM: ${mail.from.name}@${mail.from.domain}
TO: ${addressees}${copies}
SUBJECT: ${mail.urgent ? "[URGENT] " : ""}${mail.subject}
BODY: ${mail.body}`;
    }
}

// Discriminated Unions
type Success = { status: "success"; data: string};
type ErrorResult = { status: "error"; error: string};

type Result = Success | ErrorResult;

function handleResult(result: Result) {
    if (result.status === "success") {
        return result.data // TS knows that result is Success
    }
    return result.error // TS knows that result is ErrorResult
}

// Sets & Map

export function findNumUniqueLabels(formattedAddresses: string[]) {
    // it infers that the type of the set also must be string array of strings
    const set = new Set(formattedAddresses);
    return set.size;
}

type Dog = { kind: "dog"; barkVolume: number};
type Cat = { kind: "cat"; livesLeft: number};
type Bird = { kind: "bird"; canFly: boolean};

type Pet = Dog | Cat | Bird;

const petStore = new Map<string, Pet>();

petStore.set("a1", { kind: "dog", barkVolume: 10});
petStore.set("b1", { kind: "cat", livesLeft: 7});
petStore.set("c1", { kind: "bird", canFly: true});

//get one value from map
const maybePet = petStore.get("b2");
if (maybePet) {
    if (maybePet.kind === "cat" ) {
        console.log(`Cat lives: ${maybePet.livesLeft}`);
    }
}
// entries() is a 2-value tuple 
const summaries = Array.from(petStore.entries()).map(([, pet]) => {
    switch (pet.kind) {
        case "dog":
            return `Dog barks at volume ${pet.barkVolume}`;
        case "cat":
            return `Cat has ${pet.livesLeft} lives left`;
        case "bird":
            return `Bird can${pet.canFly ? "" : "not"} fly`;
    }
});

console.log(summaries);

// object can have any additional properties as long as it has the required properties
type MailPreferences = {
    readonly doNotDisturb: boolean;
    outOfOffice: boolean;
    [key: string]: string | boolean;
};


function printPreferences(prefs: MailPreferences) {
    for (const key in prefs) {
        console.log(key, "=", prefs[key]);
    }
}

const prefs: MailPreferences = {
    doNotDisturb: true,
    outOfOffice: true,
    theme: "dark",
    fontSize: "medium",
};
printPreferences(prefs);

// as const and object freeze
export const defaultPreferences = {
    name: "Kreese",
    doNotDisturb: false,
    outOfOffie: false,
} as const;

const colorsConst = ["red", "green", "blue"] as const
colorsConst.push("yellow"); // error because colorsConst is readonly array of string literals

// Satisfies
// So like this satisfies operator make sure that type of a is the same as A and it also checks if it is as const
type A = {name: string}
const a = {name: "Kyle"} as const satisfies A;



// Function overloading
export function configurePreferences(doNotDisturb: boolean, outOfOffice: boolean) : MailPreferences;
export function configurePreferences(doNotDisturb: boolean, outOfOffice: boolean | string, useSystemTheme: boolean, theme: string) : MailPreferences;
export function configurePreferences(doNotDisturb: boolean, outOfOffice: boolean | string, useSystemTheme?: boolean, theme?: string) : MailPreferences {
    if (typeof outOfOffice === "string") {
        return {
            doNotDisturb: false,
            outOfOffice: false,
            useSystemTheme: doNotDisturb,
            theme: outOfOffice,
        }
    } else if (useSystemTheme !== undefined && theme !== undefined) {
        return {
            doNotDisturb: doNotDisturb,
            outOfOffice: outOfOffice,
            useSystemTheme: useSystemTheme,
            theme: theme,
        };
    } else {
        return {
            doNotDisturb: doNotDisturb,
            outOfOffice: outOfOffice,
        }
    }
}
