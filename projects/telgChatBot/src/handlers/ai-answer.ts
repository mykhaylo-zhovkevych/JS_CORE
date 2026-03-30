import { markdownToHtml } from "../lib/formatMarkdown";
import { askDeepSeek } from "../services/ai";
import type { BotContext } from "../types/bot-types";

export async function AiAnswerHandler(ctx: BotContext, next: () => Promise<void>) {

        const message = ctx.message?.text;

        if (!ctx.session.waitingForAI) {
            return next();
        }

        if (!message) {
            return next();
        }
        // keeps the bot from processing messages before action
        ctx.session.waitingForAI = false;

        const thinkingMessage = await ctx.reply("Let me think... 🤔");

        const safeDelete = () => 
            ctx.api.deleteMessage(ctx.chat!.id, thinkingMessage.message_id);

        try {
            const response = await askDeepSeek(message);
            await ctx.reply(markdownToHtml(response), {parse_mode: "HTML"});

        } catch (error) {
            console.error(error);
            await ctx.reply("Something went wrong while processing your message. Please try again.");
        } 
        finally {
            safeDelete();
    }
        
}
