// It takes the tokens from the lexer and understands their structure (meaning)
import type { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier, VarDeclaration, AssignmentExpression, ObjectLiteral, Property } from "./ast.js";
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
            default:
                return this.parse_expr();
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

    private parse_multiplicative_expr(): Expr {
        // it has more precedence than additive expression, so i call it first to get the right hand side of the additive expression
        let left = this.parse_primary_expr();

        // parsing token itself
        while (this.at().value == '/' || this.at().value == '*' || this.at().value == '%') 
        {
            const operator = this.eat().value;
            const right = this.parse_primary_expr();
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
    // FunctionCall
    // LogicalExpr
    // ComparisonExpr
    // AdditiveExpr
    // MultiplicativeExpr
    // UnaryExpr
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
