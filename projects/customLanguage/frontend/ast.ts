// ast nodes
export type NodeType = 
"Program" |
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

