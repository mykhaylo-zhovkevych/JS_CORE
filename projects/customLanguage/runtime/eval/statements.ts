import type { FunctionDeclaration, Program, VarDeclaration } from "../../frontend/ast.js";
import type Environment from "../environmnet.js";
import { evaluate } from "../interpreter.js";
import { MK_NULL, type FunctionValue, type RuntimeValue } from "../values.js";

export function evaluate_program (program: Program, env: Environment): RuntimeValue {
    let lastEvaluated: RuntimeValue = MK_NULL();
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
    }
    return lastEvaluated;
}

export function evaluate_var_declaration (declaration: VarDeclaration, env: Environment): RuntimeValue {
    const valueToStore = declaration.value ? evaluate(declaration.value, env) : MK_NULL();
    return env.declareVar(declaration.identifier, valueToStore, declaration.constant);
}

export function evaluate_function_declaration (declaration: FunctionDeclaration, env: Environment): RuntimeValue {
    const fn = {
        type: "function",
        name: declaration.name,
        parameters: declaration.parameters,
        declarationEnv: env,
        body: declaration.body,
    } as FunctionValue;

    return env.declareVar(declaration.name, fn, true);
}