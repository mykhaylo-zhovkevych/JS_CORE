// It takes the tokens from the lexer and understands their structure (meaning)
import type { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier, VarDeclaration, AssignmentExpression, ObjectLiteral, Property, CallExpr, MemberExpr, FunctionDeclaration } from "./ast.js";
import { tokenize, TokenType, type Token } from "./lexer.js";

export default class Parser {

    private tokens: Token[] = [];

    private not_eof(): boolean {
        return this.tokens[0]!.type != TokenType.EOF;
    }

    private at(): Token {
        return this.tokens[0]!;
    }

    private eat(): Token {
            // removes and increments to the next token
            const prev = this.tokens.shift() as Token;
            if (!prev) {
                throw new Error("Unexpected end of input");
            }
        return prev;
    }

    private expect (type: TokenType, err: string): Token {
        const prev = this.tokens.shift();
        if (!prev || prev.type !== type) {
            const found = prev ? TokenType[prev.type] : "EOF";
            const expected = TokenType[type];
            throw new Error(`Parser Error: ${err}. Found: ${found}, Expected: ${expected}`);
        }
        return prev;
    }

    private isIdentifier(epxr: Expr): epxr is Identifier {
        return epxr.kind === "Identifier";
    }

    public produceAST (sourceCode: string): Program {

        this.tokens = tokenize(sourceCode);
        const program: Program = {
            kind: "Program",
            body: [],
        };

        // Parse until end of file
        while (this.not_eof()) {
            program.body.push(this.parse_stmt());
        }

        return program;
    }

    // Orders of Prescidence:
    // AssignmentExpr
    // ObjectExpr
    // AdditiveExpr
    // MultiplicativeExpr
    // CallExpr
    // MemberExpr
    // PrimaryExpr

    private parse_stmt(): Stmt {
        // skip to parse_expr
        switch (this.at().type) {
            case TokenType.Let:
            case TokenType.Const:
                return this.parse_var_declaration();
            case TokenType.Fn:
                return this.parse_fn_declaration();
            default: {
                const expr = this.parse_expr();
                // semicolon after expression stmnt
                if (this.at().type === TokenType.Semicolon) {
                    this.eat();
                }
                return expr;
            }
        }
    }

    // must test before running the at() can give wrong token

    // LET indet;
    // (CONST | LET) Identifier = expr;
    private parse_var_declaration(): VarDeclaration {
        // If curent token is a const after advancing  
        const isConstant = this.eat().type === TokenType.Const;
        const identifier = this.expect(TokenType.Identifier, 
            "Expected indetifier name following let | const keywords").value;

        if (this.at().type === TokenType.Semicolon) {
            this.eat(); // eat the semicolon
            if (isConstant){
                throw new Error("Must assign a value to a constant expression. No value provided.");
            }
            const declaration: VarDeclaration = {
                kind: "VarDeclaration",
                identifier,
                constant: false,
            };
            return declaration;
        }

        this.expect(TokenType.Equals, "Expected equals token following identifier in variable declaration");
        const expr = this.parse_expr();
        this.expect(TokenType.Semicolon, "Expected semicolon following variable declaration");

        const declaration: VarDeclaration = {
            kind: "VarDeclaration",
            identifier,
            value: expr,
            constant: isConstant,
        };
        
        return declaration;
    }

    private parse_fn_declaration(): FunctionDeclaration {
        this.eat(); // eat the fn 
        const name = this.expect(TokenType.Identifier, "Expected function name following fn keyword").value;

        const args = this.parse_args();
        const params: string[] = [];
        for (const arg of args) {
            if (!this.isIdentifier(arg)) {
                throw new Error("Function parameters must be identifiers");
            }
            params.push(arg.symbol);
        }
        this.expect(TokenType.OpenBrace, "Expected function body following declaration");
        const body: Stmt[] = [];

        while (this.at().type !== TokenType.EOF && this.at().type !== TokenType.CloseBrace) {
            body.push(this.parse_stmt());
        }
        this.expect(TokenType.CloseBrace, "Closing brace expected inside function declaration");
        const fn: FunctionDeclaration = {
            kind: "FunctionDeclaration",
            parameters: params,
            name,
            body,
        };
        return fn;
    }
    
    private parse_expr(): Expr {
        return this.parse_assignment_expr();
    }

    private parse_assignment_expr(): Expr { 
        const left = this.parse_object_expr();

        if (this.at().type === TokenType.Equals) { 
            this.eat(); // advance past equals token
            const value = this.parse_assignment_expr(); 
            
            const assignment: AssignmentExpression = {
                kind: "AssignmentExpression",
                assigne: left, 
                value,
            };
            return assignment;
        }
        return left;
    }
    
    private parse_object_expr(): Expr {
        // If no the object case
        if (this.at().type !== TokenType.OpenBrace) {
            return this.parse_additive_expr();
        }
        this.eat(); // advance past open brace
        const properties: Property[] = [];
        //const properties = new Array<Property>();

        while (this.not_eof() && this.at().type !== TokenType.CloseBrace) {
            // { key: val, key2: val} | { key }
            const key = this.expect(TokenType.Identifier, "Expected identifier as object literal key").value;

            // Shorthand property: { key } or { key, ... }
            if (this.at().type === TokenType.Comma || this.at().type === TokenType.CloseBrace) {
                const property: Property = {
                    kind: "Property",
                    key,
                };
                properties.push(property);
                
                if (this.at().type === TokenType.Comma) {
                    this.eat(); // eat comma between properties
                }
                continue; // As long as a comma or closing brace follows we can assume it's a shorthand property and continue to the next one
            }

            // Full property: { key: value }
            this.expect(TokenType.Colon, "Missing colon following identifier in object expression");
            const value = this.parse_expr(); // any expression can be the value of the property

            const property: Property = {
                kind: "Property",
                key,
                value,
            };
            properties.push(property);
     
            if (this.at().type !== TokenType.CloseBrace) {
                this.expect(TokenType.Comma, "Missing comma or clsosing brace in object expression");
            }
        }
        this.expect(TokenType.CloseBrace, "Object literal missing closing brace");
        
        const objectLiteral: ObjectLiteral = {
            kind: "ObjectLiteral",
            properties,
        };
        return objectLiteral;
    }

    // (10 + 5) - 5 right hand precedence
    private parse_additive_expr(): Expr {
        let left = this.parse_multiplicative_expr();

        // parsing token itself
        while (this.at().value === '+' || this.at().value === '-') {
            const operator = this.eat().value;
            const right = this.parse_multiplicative_expr();
            // returns back to the left and start parsing again (while expression)
            
            const bninaryExpr: BinaryExpr = {
                kind: "BinaryExpression",
                left, 
                right, 
                operator
            };
            left = bninaryExpr;
        }
        return left;
    }

    private parse_multiplicative_expr(): Expr {
        // it has more precedence than additive expression, so i call it first to get the right hand side of the additive expression
        let left = this.parse_call_member_expr();

        // parsing token itself
        while (this.at().value === '/' || this.at().value === '*' || this.at().value === '%') 
        {
            const operator = this.eat().value;
            const right = this.parse_call_member_expr();
            // returns back to the left and start parsing again (while expression)
            
            const binaryExpr: BinaryExpr = {
                kind: "BinaryExpression",
                left,
                right,
                operator,
            };

            left = binaryExpr;
        }
        return left;
    }

    // recursive foo.x()
    private parse_call_member_expr(): Expr {
        const member = this.parse_member_expr();

        if (this.at().type === TokenType.OpenParen) {
            return this.parse_call_expr(member);
        }

        return member;
    }

    private parse_call_expr(callee: Expr): Expr {
        // parsed 
        let callExor: CallExpr = {
            kind: "CallExpression",
            callee,
            args: this.parse_args(),
        };
        
        while (this.at().type === TokenType.OpenParen) {
            callExor = {
                kind: "CallExpression",
                callee: callExor,
                args: this.parse_args(),
            };
        }

        return callExor;
    }


    // Helper function 
    private parse_args(): Expr[] {
        this.expect(TokenType.OpenParen, "Expected open parenthesis");
        const args = this.at().type === TokenType.CloseParen 
            ? [] 
            : this.parse_arguments_list();

        this.expect(TokenType.CloseParen, "Missing closing parenthesis");
        return args;
    }

    private parse_arguments_list(): Expr[] {
        const args: Expr[] = [this.parse_assignment_expr()];
        
        while (this.at().type === TokenType.Comma && this.eat()) {
           args.push(this.parse_assignment_expr());
        }
        return args;
    }

    private parse_member_expr(): Expr {
        let object = this.parse_primary_expr();

        while(this.at().type === TokenType.Dot || this.at().type === TokenType.OpenBracket) {
            const operatorToken = this.eat();
            let property: Expr;
            let computed: boolean; 
            let operator: "." | "[]";

            // non computed values 
            if (operatorToken.type === TokenType.Dot) {
                computed = false;
                operator = ".";
                property = this.parse_primary_expr(); // Identifier 
                if (property.kind !== "Identifier") {
                    throw new Error(`Cannot use dot operator without right hand identifier. Found ${property.kind}`);
                }
            } else {
                computed = true;
                operator = "[]";
                property = this.parse_expr();
                this.expect(TokenType.CloseBracket, "Missing closing bracket for computed member expression");
            }

            const memberExpr: MemberExpr = {
                kind : "MemberExpression",
                object, 
                property, 
                computed, 
                operator,
            };

            object = memberExpr; // for recursive foo.bar.baz or foo[bar][baz]
        }
        return object;
    }

    private parse_primary_expr(): Expr {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                const identifier: Identifier = {
                    kind: "Identifier",
                    symbol: this.eat().value,
                };

                return identifier;
            case TokenType.Number: 
            const numericLiteral: NumericLiteral = {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                };

                return numericLiteral;  
            
            case TokenType.OpenParen: {
                this.eat(); // eat the open paren
                const value = this.parse_expr();
                this.expect(TokenType.CloseParen, "Missing closing parenthesis");
                return value;
            }

            default: 
                console.error(`Unexpected token: ${this.at().value}`);
                throw new Error(`Unexpected token: ${this.at().value}`);
        }
    }
}