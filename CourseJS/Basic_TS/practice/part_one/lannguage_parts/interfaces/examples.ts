/*
 * interface is used when I expect things to grow or be extended later
 * type is used when you define logic/composition(unions, combinations, function types)
 * interface can be extended/merged (good for shared/global structures)
 * type better for shaping data logic
 * 
 */


interface BaseResponse {
    success: boolean;
}

interface UserResponse extends BaseResponse {
    data: {
        page: number;
        total: string;
    };
}

interface PaginatedResponse extends BaseResponse {
    page: number;
    total: number;
}

// types and interfaces can be used together
export type Message = {
    Id: string;
    sender: string;
    recipient: string;
    timestamp: number;
}

export interface TextMessage extends Message {
    text: string;
    carrier: string;
}

export interface EmailMessage extends Message {
    subject: string;
    body: string;
}

export function getEmailDescription(email: EmailMessage): string {
    return `[Email] from ${email.subject}: ${email.body}`;
}

export function getTextDescription(text: TextMessage): string {
    return `[Text] from ${text.sender}: ${text.text}`;
}

// extending interfaces

export interface CanReply {
    reply(text: string): string;
}
export interface CanSummarize {
    summarize(conversation: string[]): string;
}
export interface CanAct {
    takeAction(action: string): void;
}


export interface SmartReplyBot extends CanReply, CanSummarize, CanAct {
    name: string;
    status: "online" | "offline" | "starting";
    shutdown: () => string;
}

// Auth middleware example
// I want get the req.user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: "admin" | "user";
            };
        }
    }
}

// now somewhere in the app
app.get("/profile", (req, res) => {
    if (req.user?.role === "admin") {
        // fully typed
    }
});

// namespace was used for organization but now days is used for global augmentation, like the express example above

// module augmentation
// library.d.ts
export interface Session {
    token: string;
}
// now i wnat extend this Session in my own database
declare module "./library" {
    interface Session {
        userId: string;
    }
}
// Global augmentaton
// it exists in the global type space, not just inside one imported module
export {}; // make file module
declare global {
    interface Window {
        appVersion: string;
    }
}
// now this is valid
window.appVersion = "1.0.0";

// Sometimes the type that needed to be augmented is not just signle global interface. it is nested under named scope such as "Express" "NodeJS"
// This is where namespace still matters
export {};

declare global { // augmenting global types
    namespace Express { // inside of global scope, target the Express namespace
        interface Request { // inside of namespace reopen Request
            user?: {
                id: string;
                role: "admin" | "user";
            };
        }
    }
}