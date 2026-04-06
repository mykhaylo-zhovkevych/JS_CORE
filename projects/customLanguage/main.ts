import Parser from "./frontend/parser.js";
import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { evaluate } from "./runtime/interpreter.js";
import Environment from "./runtime/environmnet.js";
import { MK_BOOL, MK_NULL } from "./runtime/values.js";


repl();

async function repl () {
    const parser = new Parser();
    const env = new Environment();

    env.declareVar("true", MK_BOOL(true));
    env.declareVar("false", MK_BOOL(false));
    env.declareVar("null", MK_NULL());


    const rl = createInterface({ input, output });

    console.log("Repl v0.1.");
    while (true) {
        const line = await rl.question("> ");

        if (line.trim() === "" || line.includes("exit")) {
            break;
        }

        const program = parser.produceAST(line);
        const result = evaluate(program, env);
        console.dir(result, { depth: null });
    }

    rl.close();
    console.log("Exiting REPL.");
}