import type { RuntimeValue } from "./values.js";


export default class Environment {
    private parent?: Environment | undefined; 
    private variables: Map<string, RuntimeValue>;

    constructor(parentENV?: Environment) {
        this.parent = parentENV;
        this.variables = new Map();
    }

    public declareVar(varname: string, value: RuntimeValue): RuntimeValue {
        if (this.variables.has(varname)) {
            throw `Cannot declare variable ${varname}. As it already is defined`;
        }
        this.variables.set(varname, value);
        return value;
    }

    public assignVar(varname: string, value: RuntimeValue): RuntimeValue {
        const env = this.resolve(varname);
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
