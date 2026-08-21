import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { MK_BOOL, MK_NATIVE_FN, MK_NULL, MK_STRING, type HtmlStringValue, type RuntimeValue } from "./values.js";

const DEFAULT_OUTPUT_FILE = "output.html";


function filenameFromArg (arg: RuntimeValue): string {
    if (arg.type === "string") {
        throw new Error("generate() expects a double quoted filename");
    }
    if (arg.type !== "html-string") {
        throw new Error(`generate() expects a filename, got ${arg.type}`);
    }
    const name = (arg as HtmlStringValue).value.trim();
    if (name === "") {
        throw new Error("generate() was given an empty filename");
    }
    return name;
}

function renderDocument (sections: string[]): string {
    return [
        "<!DOCTYPE html>",
        `<html lang="en">`,
        "<head>",
        `    <meta charset="utf-8">`,
        `    <meta name="viewport" content="width=device-width, initial-scale=1">`,
        "    <title>Generated</title>",
        "</head>",
        "<body>",
        ...sections,
        "</body>",
        "</html>",
        "",
    ].join("\n");
}

export function createGlobalEnv () {
    const env = new Environment();
    env.declareVar("true", MK_BOOL(true), true);
    env.declareVar("false", MK_BOOL(false), true);
    env.declareVar("null", MK_NULL(), true);

    env.declareVar("print", 
            MK_NATIVE_FN((args, scope) => {
                console.log(...args);
            return MK_NULL();
            }), 
        true
    );

    function timeFunction (args: RuntimeValue[], _env: Environment) {
        return MK_STRING((new Date().toISOString()));
    }

    // generate("page.html") -> same, into the given path
    function generateIntoFile (args: RuntimeValue[], env: Environment): RuntimeValue {
        const target = args.length > 0 ? filenameFromArg(args[0]!) : DEFAULT_OUTPUT_FILE;

        const sections: string[] = [];
        for (const [, value] of env) {
            if (value.type !== "html-string") {
                continue; // plain strings, numbers and the builtins are not markup
            }
            sections.push(`    ${(value as HtmlStringValue).value}`);
        }

        const path = resolve(process.cwd(), target);
        writeFileSync(path, renderDocument(sections), "utf8");

        return MK_STRING(path);
    }

    env.declareVar("time", MK_NATIVE_FN(timeFunction), true);
    env.declareVar("generate", MK_NATIVE_FN(generateIntoFile), true);


    return env;
}

export default class Environment {
    private readonly parent?: Environment | undefined; 
    private readonly variables: Map<string, RuntimeValue>;
    private readonly constants: Set<string>

    constructor(parentENV?: Environment) {
        const global = parentENV ? false : true;
        this.parent = parentENV;
        this.variables = new Map();
        this.constants = new Set();

    }

    public declareVar(varname: string, value: RuntimeValue, constant: boolean): RuntimeValue {
        if (this.variables.has(varname)) {
            throw new Error(`Cannot declare variable ${varname}. As it already is defined`);
        }
        this.variables.set(varname, value);
        if (constant) {
            this.constants.add(varname);
        }
        return value;
    }

    public assignVar(varname: string, value: RuntimeValue): RuntimeValue {
        const env = this.resolve(varname);
        // Cannot assign to a variable that is a constant
        if (env?.constants.has(varname)) {
            throw new Error(`Cannot assign variable ${varname} as it is a constant.`);
        }
        env?.variables.set(varname, value);
        return value;
    }

    public lookupVar(varname: string): RuntimeValue {
        const env = this.resolve(varname);
        return env!.variables.get(varname) as RuntimeValue;
    }


    public *[Symbol.iterator](): IterableIterator<[string, RuntimeValue]> {
        const seen = new Set<string>();

        // c like for loop to traverse the scope of the environments to find a variable. assigning a x but x exist in the global scope, traverse through the parent environments
        for ( let env: Environment | undefined = this; env; env = env.parent) 
            {
            for (const entry of env.variables) {
                if (!seen.has(entry[0])) {
                    seen.add(entry[0]);
                    yield entry;
                }
            }
        }
    }

    // traversing the scope of the environments to find a variable. assigning a x but x exist in the global scope, traverse through the parent environments
    public resolve (varname: string): Environment | undefined {
        // if current scope has it
        if (this.variables.has(varname)) {
            return this;
        }

        if (this.parent == undefined) {
            throw new Error(`Cannot resolve variable ${varname} as it does not exist`);
        }
        // Else go the parent scope
        return this.parent.resolve(varname);
    }
}