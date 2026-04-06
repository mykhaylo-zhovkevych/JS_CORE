// The interpreter walks through this structure and performs actions:

import {type RuntimeValue, type NumberValue, MK_NULL} from "./values.js";
import type { BinaryExpr, Identifier, NumericLiteral, Program, Stmt} from "../frontend/ast.js";
import type Environment from "./environmnet.js";


function evaluate_numeric_expr (leftHandSide: NumberValue, rightHandSide: NumberValue, operator: string): NumberValue {
    switch (operator) {
        case "+":
            return {
                type: "number",
                value: leftHandSide.value + rightHandSide.value,
            }
        case "-":
            return {
                type: "number",
                value: leftHandSide.value - rightHandSide.value,
            }
        case "*":
            return {
                type: "number",
                value: leftHandSide.value * rightHandSide.value,
            }
        case "/":
            // Division by zero check
            return {
                type: "number",
                value: leftHandSide.value / rightHandSide.value,
            }
        default:
            throw new Error(`Interpreter Error: Unsupported operator ${operator}`);
    }
} 

function evaluate_binary_expr (binop: BinaryExpr, env: Environment): RuntimeValue {

    const leftHandSide = evaluate(binop.left, env);
    const rightHandSide = evaluate(binop.right, env);

    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        return evaluate_numeric_expr(
            leftHandSide as NumberValue, 
            rightHandSide as NumberValue, 
            binop.operator
        );

    } else {
        return MK_NULL();
    }
}


function evaluate_program (program: Program, env: Environment): RuntimeValue {
    let lastEvaluated: RuntimeValue = MK_NULL();
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
    }
    return lastEvaluated;
}

function evaluate_identifier (ident: Identifier, env: Environment): RuntimeValue {
    const val = env.lookupVar(ident.symbol);
    return val;
}


export function evaluate (astNode: Stmt, env: Environment): RuntimeValue {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: (astNode as NumericLiteral).value,
                type: "number",
            } as NumberValue;

        case "Identifier":
            return evaluate_identifier(astNode as Identifier, env);

        case "BinaryExpression":
            return evaluate_binary_expr(astNode as BinaryExpr, env);
        
        case "Program":
            return evaluate_program(astNode as Program, env);

        default:
            throw new Error(`Interpreter Error: Unsupported AST Node Type: ${astNode.kind}`);
    }
}