// An intersections type combines multiple types into one wiht the & operator.
// The reuslting intersection type satisfies all the component types simultaneously

type IndividualContributor =  {
    id: number;
    name: string;
    tasks: string[];
};

type Manager = {
    directReports: number[];
};
type GoodManager = IndividualContributor & Manager;

const hunter: GoodManager = {
    id: 1,
    name: "Hunter Backmann",
    tasks: ["Review code", "Attend meetings"],
    directReports: [2, 3],
}

// Example
export type SupportBot = {
    id: string;
    name: string;
    status: string;
    language: string;
};

export type TextBot = SupportBot & {
    messageLog: string[];
    sendMessage: (message: string) => string;
}

export type VoiceBot = SupportBot & {
    callLog: string[];
    phoneNumber: string;
    dialNumber: (phoneNumber: string) => string;
}

// Never type
type slashCommands = "greet" | "info" | "help";

const greetMessage = "Helo! How can i assist you";
const infoMessage = "Sure Here a list of things i can do";
const helpMessage = "I can help you with that";

export function handleCommand(command: slashCommands) {
    if (command === "greet") {
        return greetMessage;
    }
    else if (command === "info") {
        return infoMessage;
    }
    else if (command === "help") {
        return helpMessage;
    }
    // At this point the command must be impossible becaue all check was done
    throw new Error(`Unexpected command: ${command satisfies never}`);
}

// Other use cases are
// functions that never return, Infinite loops, Narrowing, Filtering types (advanced)
function fail(): never {
    throw new Error("Crash");
}

