// The interpreter walks through this structure and performs actions:

import {type RuntimeValue, type NumberValue, MK_NULL} from "./values.js";
import type { BinaryExpr, Identifier, NumericLiteral, Program, Stmt, VarDeclaration } from "../frontend/ast.js";
import type Environment from "./environmnet.js";
import { evaluate_binary_expr, evaluate_identifier } from "./eval/expressions.js";
import { evaluate_program, evaluate_var_declaration } from "./eval/statements.js";




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

        case "VarDeclaration":
            return evaluate_var_declaration(astNode as VarDeclaration, env);
        
        case "Program":
            return evaluate_program(astNode as Program, env);

        default:
            console.error(
                "This AST Node has not yet beeen setup for interpreation.",
                astNode,
            );
            return MK_NULL();
    }
}