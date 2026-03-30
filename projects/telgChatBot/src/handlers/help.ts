import type { BotContext } from "../types/bot-types";

export async function HelpHandler(ctx: BotContext) {
    await ctx.reply(`Here are some commands you can run:
    /start - Start the bot and see the main menu
    /help - View this help docu

This bot can answer predefined questions about data science and data security.
For each new question, press desired topic button first, then ask your question.
    `
);}