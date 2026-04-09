// It takes the tokens from the lexer and understands their structure (meaning)
import type { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier, VarDeclaration, AssignmentExpression, ObjectLiteral, Property, CallExpr, MemberExpr, FunctionDeclaration } from "./ast.js";
import { tokenize, TokenType, type Token } from "./lexer.js";

export default class Parser {

    private tokens: Token[] = [];

    private not_eof(): boolean {
        return this.tokens[0]!.type != TokenType.EOF;
    }

    private at () {
        return this.tokens[0] as Token;
    }

    private eat () {
            // removes and increments to the next token
            const prev = this.tokens.shift() as Token;
        return prev;
    }

    private expect (type: TokenType, err: string): Token {
        const prev = this.tokens.shift() as Token | undefined;
        if (!prev || prev.type !== type) {
            const found = prev ? TokenType[prev.type] : "EOF";
            const expected = TokenType[type];
            throw new Error(`Parser Error: ${err}. Found: ${found}, Expected: ${expected}`);
        }
        return prev;
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
                // Optional semicolon after expression stmnt
                if (this.at().type == TokenType.Semicolon) {
                    this.eat();
                }
                return expr;
            }
        }
    }

    // LET indet;
    // (CONST | LET) Identifier = expr;
    private parse_var_declaration(): Stmt {
        // If curent token is a const after advancing  
        const isConstant = this.eat().type == TokenType.Const;
        const identifier = this.expect(TokenType.Identifier, 
            "Expected indetifier name following let | const keywords").value;

        if (this.at().type == TokenType.Semicolon) {
            this.eat(); // eat the semicolon
            if (isConstant){
                throw "Must assign a value to a constant expression. No value provided.";
            }
            return { kind: "VarDeclaration", identifier, constant: false } as VarDeclaration;
        }

        this.expect(TokenType.Equals, "Expected equals token following identifier in variable declaration");
        const expr = this.parse_expr();
        this.expect(TokenType.Semicolon, "Expected semicolon following variable declaration");

        const declaration = {
            kind: "VarDeclaration",
            identifier,
            value: expr,
            constant: isConstant,
        } as VarDeclaration;
        
        return declaration;
    }

    private parse_fn_declaration(): Stmt {
        this.eat(); // eat the fn 
        const name = this.expect(TokenType.Identifier, "Expected function name following fn keyword").value;

        const args = this.parse_args();
        const params: string[] = [];
        for (const arg of args) {
            if (arg.kind !== "Identifier") {
                console.log(arg);
                throw "Function parameters must be identifiers";
            }
            params.push((arg as Identifier).symbol);
        }
        this.expect(TokenType.OpenBrace, "Expected function body following declaration");
        const body: Stmt[] = [];

        while (this.at().type !== TokenType.EOF && this.at().type !== TokenType.CloseBrace) {
            body.push(this.parse_stmt());
        }
        this.expect(TokenType.CloseBrace, "Closing brace expected inside function declaration");
        const fn = {
            kind: "FunctionDeclaration", parameters: params, name, body
        } as FunctionDeclaration;
        return fn;
    }
    
    private parse_expr(): Expr {
        return this.parse_assignment_expr();
    }

    private parse_assignment_expr(): Expr { 
        const left = this.parse_object_expr();

        if (this.at().type == TokenType.Equals) { 
            this.eat(); // advance past equals token
            const value = this.parse_assignment_expr(); 
            return {
                value, assigne: left, kind: "AssignmentExpression"
            } as AssignmentExpression;
        }
        return left;
    }
    
    private parse_object_expr(): Expr {
        // If no the object case
        if (this.at().type !== TokenType.OpenBrace) {
            return this.parse_additive_expr();
        }
        this.eat(); // advance past open brace
        const properties = new Array<Property>();

        while (this.not_eof() && this.at().type !== TokenType.CloseBrace) {
            // { key: val, key2: val} | { key }
            const key = this.expect(TokenType.Identifier, "Expected identifier as object literal key").value;

            // Shorthand property: { key } or { key, ... }
            if (this.at().type == TokenType.Comma || this.at().type == TokenType.CloseBrace) {
                properties.push({ key, kind: "Property" } as Property);
                if (this.at().type == TokenType.Comma) {
                    this.eat(); // eat comma between properties
                }
                continue; // As long as a comma or closing brace follows we can assume it's a shorthand property and continue to the next one
            }

            // Full property: { key: value }
            this.expect(TokenType.Colon, "Missing colon following identifier in object expression");
            const value = this.parse_expr(); // any expression can be the value of the property

            properties.push({ kind: "Property", value, key });
            if (this.at().type != TokenType.CloseBrace) {
                this.expect(TokenType.Comma, "Missing comma or clsosing brace in object expression");
            }
        }
        this.expect(TokenType.CloseBrace, "Object literal missing closing brace");
        return { kind: "ObjectLiteral", properties } as ObjectLiteral;
    }

    // (10 + 5) - 5 right hand precedence
    private parse_additive_expr(): Expr {
        let left = this.parse_multiplicative_expr();

        // parsing token itself
        while (this.at().value == '+' || this.at().value == '-') {
            const operator = this.eat().value;
            const right = this.parse_multiplicative_expr();
            // returns back to the left and start parsing again (while expression)
            left = {
                kind: "BinaryExpression",
                left, right, operator
            } as BinaryExpr;
        }
        return left;
    }

    // recursive foo.x()
    private parse_call_member_expr(): Expr {
        const member = this.parse_member_expr();

        if (this.at().type == TokenType.OpenParen) {
            return this.parse_call_expr(member);
        }

        return member;

    }

    private parse_call_expr(callee: Expr): Expr {
        // parsed 
        let call_epxr: Expr = {
            kind: "CallExpression",
            args: this.parse_args(),
            callee,

        } as CallExpr;
        
        // if a new param is added
        if (this.at().type == TokenType.OpenParen) {
            call_epxr = this.parse_call_expr(call_epxr);
        }

        return call_epxr;

    }


    // Helper function 
    private parse_args(): Expr[] {
        this.expect(TokenType.OpenParen, "Expected open parenthesis");
        const args = this.at().type == TokenType.CloseParen 
            ? [] 
            : this.parse_arguments_list();

        this.expect(TokenType.CloseParen, "Missing closing parenthesis");
        return args;
    }

    private parse_arguments_list(): Expr[] {
        const args = [this.parse_assignment_expr()];
        
        while (this.at().type == TokenType.Comma && this.eat()) {
           args.push(this.parse_assignment_expr());
        }
        return args;
    }

    private parse_member_expr(): Expr {
        let object = this.parse_primary_expr();

        while(this.at().type == TokenType.Dot || this.at().type == TokenType.OpenBracket) {
            const operator = this.eat();
            let property: Expr;
            let computed: boolean; 

            // non computed values 
            if (operator.type == TokenType.Dot) {
                computed = false;
                property = this.parse_primary_expr(); // Identifier 
                if (property.kind != "Identifier") {
                    throw `Cannot use dot operator without right hand identifier. Found ${property.kind}`;
                }
            } else {
                computed = true;
                property = this.parse_expr();
                this.expect(TokenType.CloseBracket, "Missing clsoing bracket for computed member expression");
            }
            object = {
                kind : "MemberExpression",
                object, property, computed,
            } as MemberExpr; // bypasses excess-property complain of Expr
        }
        return object;
    }

    private parse_multiplicative_expr(): Expr {
        // it has more precedence than additive expression, so i call it first to get the right hand side of the additive expression
        let left = this.parse_call_member_expr();

        // parsing token itself
        while (this.at().value == '/' || this.at().value == '*' || this.at().value == '%') 
        {
            const operator = this.eat().value;
            const right = this.parse_call_member_expr();
            // returns back to the left and start parsing again (while expression)
            left = {
                kind: "BinaryExpression",
                left, right, operator
            } as BinaryExpr;
        }
        return left;
    }

    // Orders of Prescidence:
    // AssignmentExpr
    // ObjectExpr
    // AdditiveExpr
    // MultiplicativeExpr
    // CallExpr
    // MemberExpr
    // PrimaryExpr


    private parse_primary_expr(): Expr {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                return { kind : "Identifier", symbol: this.eat().value } as Identifier;

            case TokenType.Number: 
                return { kind: "NumericLiteral", value: parseFloat(this.eat().value) } as NumericLiteral;

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