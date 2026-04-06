// ast nodes
export type NodeType = 
//Statements
"Program" |
"VarDeclaration" |

// Expressions
 "NumericLiteral" |
  "Identifier" |
   "BinaryExpression" ;
    // "CallExpr" |
    //  "UnaryExpr" |
    //   "FunctionDeclarationn";


// abstract type
export interface Stmt {
    kind: NodeType;
}

export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}

export interface VarDeclaration extends Stmt {
    kind: "VarDeclaration";
    constant: boolean,
    identifier: string,
    value?: Expr,
}

// expected to return some value
export interface Expr extends Stmt {
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

