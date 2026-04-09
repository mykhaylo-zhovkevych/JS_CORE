// ast nodes
export type NodeType = 
//Statements
"Program" |
"VarDeclaration" |
"FunctionDeclaration" |

// Expressions
"AssignmentExpression" |
"MemberExpression" |
"CallExpression" |

// Literals
"Property" |
"ObjectLiteral"|
"NumericLiteral" |
"Identifier" |
"BinaryExpression";





// abstract type
export interface Stmt {
    kind: NodeType;
}


// expected to return some value
export interface Expr extends Stmt {
}

export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}
export interface AssignmentExpression extends Expr {
    kind: "AssignmentExpression";
    assigne: Expr;
    value: Expr;
}

export interface VarDeclaration extends Stmt {
    kind: "VarDeclaration";
    constant: boolean,
    identifier: string,
    value?: Expr,
}

export interface FunctionDeclaration extends Stmt {
    kind: "FunctionDeclaration";
    parameters: string[],
    name: string;
    body: Stmt[];
}
export interface MemberExpr extends Expr{
    kind: "MemberExpression";
    object: Expr,
    property: Expr;
    operator: string; // . or []
    computed: boolean;
}

export interface CallExpr extends Expr{
    kind: "CallExpression";
    args: Expr[],
    callee: Expr;
    
}

export interface BinaryExpr extends Expr{
    kind: "BinaryExpression";
    left: Expr,
    right: Expr,
    operator: string;
}

export interface Identifier extends Expr {
    kind: "Identifier";
    symbol: string;
}

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number;
}

export interface Property extends Expr {
    kind: "Property";
    key: string;
    value?: Expr;
}

export interface ObjectLiteral extends Expr {
    kind: "ObjectLiteral";
    properties: Property[];
}