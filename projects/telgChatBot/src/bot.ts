import "dotenv/config";
import { Bot, session } from "grammy";
import type { BotContext, SessionData } from "./types/bot-types";
import { startHandler } from "./handlers/start";
import { AiAnswerHandler } from "./handlers/ai-answer";
import { Hears } from "./consts/hears";
import { HelpHandler } from "./handlers/help";


const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN is not set in .env file");
}

export const bot = new Bot<BotContext>(BOT_TOKEN);

bot.use(
    session<SessionData, BotContext>({
        initial: () => ({
            waitingForAI: false,
        }),
    })
);

bot.command("start", startHandler);
bot.command("help", HelpHandler);

bot.hears(Hears.ASK_DATA_SCIENCE, (ctx) => {
    ctx.session.waitingForAI = true;
    ctx.reply("Great! You can ask about, data science...");
});

bot.hears(Hears.ASK_DATA_SECURITY, (ctx) => {
    ctx.session.waitingForAI = true;
    ctx.reply("Great! You can ask about, data security...");
});

bot.hears(Hears.ASK_HELP, HelpHandler);

bot.on("message:text", AiAnswerHandler); 

