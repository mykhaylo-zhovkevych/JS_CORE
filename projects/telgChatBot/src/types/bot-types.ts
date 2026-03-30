import type { Context, SessionFlavor } from "grammy";

export interface SessionData {
    waitingForAI: boolean;
}

// extended context
export type BotContext = Context & SessionFlavor<SessionData>;