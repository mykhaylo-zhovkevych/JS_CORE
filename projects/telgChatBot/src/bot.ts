import "dotenv/config";
import { Bot, session } from "grammy";
import type { BotContext } from "./types/bot-types";

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN is not set in .env file");
}

export const bot = new Bot<BotContext>(BOT_TOKEN);

bot.command("start", (ctx) => {
    ctx.reply("Hello! I'm your AI assistant.");
})
