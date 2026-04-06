// It takes the tokens from the lexer and understands their structure (meaning)
import type { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier } from "./ast.js";
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
        return this.parse_expr();
    }

    private parse_expr(): Expr {
        return this.parse_additive_expr();
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
