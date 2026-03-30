import { Hears } from "../consts/hears";
import type { BotContext } from "../types/bot-types";
import { Keyboard } from "grammy";

const keyboard = new Keyboard()
    .text(Hears.ASK_DATA_SCIENCE)
    .text(Hears.ASK_DATA_SECURITY)
    .text(Hears.ASK_HELP)
    .resized()
    .persistent();

export async function startHandler(ctx: BotContext) {
    const name = ctx.from?.first_name || "master";

    ctx.reply(`Hello, ${name}! 
        I'm your AI assistant. How can I help you today?
        
        /start = start the task
        /help = view help docu

        `, {reply_markup: keyboard}
    );
}
