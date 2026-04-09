import { MK_BOOL, MK_NATIVE_FN, MK_NULL, MK_NUMBER, type RuntimeValue } from "./values.js";

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
        return MK_NUMBER(Date.now());
    }
    env.declareVar("time", MK_NATIVE_FN(timeFunction), true);

    return env;
}

export default class Environment {
    private parent?: Environment | undefined; 
    private variables: Map<string, RuntimeValue>;
    private constants: Set<string>

    constructor(parentENV?: Environment) {
        const global = parentENV ? false : true;
        this.parent = parentENV;
        this.variables = new Map();
        this.constants = new Set();

    }

    public declareVar(varname: string, value: RuntimeValue, constant: boolean): RuntimeValue {
        if (this.variables.has(varname)) {
            throw `Cannot declare variable ${varname}. As it already is defined`;
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
            throw `Cannot assign variable ${varname} as it is a constant.`;
        }
        env?.variables.set(varname, value);
        return value;
    }

    public lookupVar(varname: string): RuntimeValue {
        const env = this.resolve(varname);
        return env!.variables.get(varname) as RuntimeValue;
    }

    // traversing the scope of the environments to find a variable. assigning a x but x exist in the global scope, traverse through the parent environments
    public resolve (varname: string): Environment | undefined {
        // if current scope has it
        if (this.variables.has(varname)) {
            return this;
        }

        if (this.parent == undefined) {
            throw `Cannot resolve variable ${varname} as it does not exist`;
        }
        // Else go the parent scope
        return this.parent.resolve(varname);
    }
}