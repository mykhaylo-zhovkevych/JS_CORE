export type ValueType = "null" | "number" | "boolean";

export interface RuntimeValue {
    type: ValueType;
}

export interface NullValue extends RuntimeValue {
    type: "null";
    value: null;
}

export interface NumberValue extends RuntimeValue {
    type: "number";
    value: number;
}

export interface BooleanValue extends RuntimeValue {
    type: "boolean";
    value: boolean;
}

export function MK_BOOL(n = true) {
    return { type: "boolean", value: n } as BooleanValue;
}

export function MK_NULL () {
    return {
        type: "null", 
        value: null,
    } as NullValue;
}

export function MK_NUMBER (n: number = 0) {
    return {
        type: "number", 
        value: n,
    } as NumberValue;
} 