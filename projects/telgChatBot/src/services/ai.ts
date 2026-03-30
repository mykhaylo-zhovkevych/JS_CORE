import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.API_DEEPSEEK_KEY,
    baseURL: "https://api.deepseek.com/v1",
});

const MODEL = process.env.OPENAI_MODEL ?? "deepseek-chat";

const SYSTEM_PROMPT = `Your are it AI assistant for Telegram bot. 
You will be given a user message and you should generate a helpful and concise response. Always respond in a friendly and conversational tone.
Your expertise includes data science, and data security.
If User dont ask specific for data science or data security, you can answer in general.
If User asks something that is not related to IT, you are not allowed to answer. And respond with "Sorry, I can only answer questions related to data science and data security. Please ask me something related to those topics."
`;

export async function askDeepSeek(userMessage: string): Promise<string> {
    try {
        const response = await client.chat.completions.create({
            model: MODEL,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userMessage },
            ],
        });

        return response.choices[0]?.message?.content ?? "unknown error";
        } catch (error: unknown) {
            // type assertion to extract status and message from the error object
            const apiError = error as {
                status?: number;
                message?: string;
                error?: { message?: string };
            };
        const status = apiError?.status;
        const providerMessage = apiError?.error?.message ?? apiError.message;

        if (status === 402) {
            return "AI provider balance is empty (402).";
        }
        if (status === 429) {
            return "I'm currently out of AI quota.";
        }
        if (status === 401) {
            return "AI API key is invalid or missing.";
        }

        console.error(`AI request failed (status: ${status}): ${providerMessage}`);
        return "Some internal AI error.";
    }
}