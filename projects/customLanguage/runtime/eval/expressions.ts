import type { AssignmentExpression, BinaryExpr, CallExpr, Identifier, ObjectLiteral, VarDeclaration } from "../../frontend/ast.js";
import Environment from "../environmnet.js";
import { evaluate } from "../interpreter.js";
import { MK_NULL, type FunctionValue, type NativeFunctionValue, type NumberValue, type ObjectValue, type RuntimeValue } from "../values.js";

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

export function evaluate_binary_expr (binop: BinaryExpr, env: Environment): RuntimeValue {

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

export function evaluate_assignment (node: AssignmentExpression, env: Environment): RuntimeValue {
    if (node.assigne.kind !== "Identifier") {
        throw "Cannot assign to non-identifier expressions.";
    }
    const varname = (node.assigne as Identifier).symbol;
    return env.assignVar(varname, evaluate(node.value, env));
}

export function evaluate_identifier (ident: Identifier, env: Environment): RuntimeValue {
    const val = env.lookupVar(ident.symbol);
    return val;
}

export function evaluate_object_expr (obj: ObjectLiteral, env: Environment): RuntimeValue {
    const object = { type: "object", properties: new Map() } as ObjectValue;
    for (const {key, value} of obj.properties) {
        // {foo: foo} otherwise if value as expr exists then get it 
        const runtimeVal = (value == undefined) ? env.lookupVar(key) : evaluate(value, env);
        object.properties.set(key, runtimeVal);
    } 
    return object;
}

export function evaluate_call_expr (expr: CallExpr, env: Environment): RuntimeValue {
    // Get RuntimeValue for each args
    const args = expr.args.map((arg) => evaluate(arg, env));
    const fn = evaluate(expr.callee, env);

    if (fn.type == "native-fn") {
        const result = (fn as NativeFunctionValue).call(args, env);
        return result;
    }
    if (fn.type == "function") {
        const func = fn as FunctionValue;
        if (args.length != func.parameters.length) {
            throw new Error(
                `Function ${func.name} expected ${func.parameters.length} argument(s), but got ${args.length}`,
            );
        }

        const scope = new Environment(func.declarationEnv);
        // paramater variable go into new local scope
        // let x = 10;
        // fn addToX(y) {
        //   x + y
        // }
        // addToX(5)

        for (let i = 0; i < func.parameters.length; i++) {
            const varname = func.parameters[i];
            const argValue = args[i];
            if (varname == undefined || argValue == undefined) {
                throw new Error(`Interpreter Error: failed to bind argument at position ${i}`);
            }
            scope.declareVar(varname, argValue, false);
        }

        let result: RuntimeValue = MK_NULL();
        for (const stmt of func.body) {
            result = evaluate(stmt, scope);
        }
        return result;
    }

    throw "Cannot call value that is not a function" + JSON.stringify(fn);
}