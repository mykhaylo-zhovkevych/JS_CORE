// The interpreter walks through this structure and performs actions:

import type { ValueType, RuntimeValue, NumberValue, NullValue} from "./values.js";
import type { BinaryExpr, NodeType, NumericLiteral, Program, Stmt} from "../frontend/ast.js";


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

function evaluate_binary_expr (binop: BinaryExpr): RuntimeValue {

    const leftHandSide = evaluate(binop.left);
    const rightHandSide = evaluate(binop.right);

    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        return evaluate_numeric_expr(leftHandSide as NumberValue, rightHandSide as NumberValue, binop.operator);

    } else {
        return {
            type: "null",
            value: "null",
        } as NullValue;
    }
}


function evaluate_program (program: Program): RuntimeValue {
    let lastEvaluated: RuntimeValue = { type: "null", value: "null" } as NullValue;

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement);
    }

    return lastEvaluated;
}

export function evaluate (astNode: Stmt): RuntimeValue {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: (astNode as NumericLiteral).value,
                type: "number",
            } as NumberValue;

        case "NullLiteral":
            return {
                value: "null",
                type: "null"
            } as NullValue;

        case "BinaryExpression":
            return evaluate_binary_expr(astNode as BinaryExpr);
        
        case "Program":
            return evaluate_program(astNode as Program);

        default:
            throw new Error(`Interpreter Error: Unsupported AST Node Type: ${astNode.kind}`);
    }
}