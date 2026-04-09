// lexer
// It takes raw text and breaks it into small meaningful pieces called tokens
// let x = 45
// [LetToken, IdentifierToken, EqualToken, NumberToken]


export enum TokenType {
    // Literal Types
    Number,
    Identifier,
    String,

    Equals,
    Comma, Colon, // :
    Dot,
    Semicolon,
    OpenParen, CloseParen,// ()
    OpenBrace, CloseBrace,// {}
    OpenBracket, CloseBracket, // []
    BinaryOperator,

    // Keywords
    Let,
    Const,
    Fn,

    EOF // signifies end of file
}

const KEYWORD: Record<string, TokenType> = {
    "let": TokenType.Let,
    "const": TokenType.Const,
    "fn": TokenType.Fn,
}
 
export interface Token {
    value: string,
    type: TokenType
}

function token (value: string, type: TokenType): Token {
    return { value, type }
}

function isalpha (src: string) {
    return src.toUpperCase() != src.toLowerCase();
} 

function isskippable (str: string) {
    return str == ' ' || str == '\n' || str == '\t' || str == '\r';
}

function isint (src: string) {
    const c = src.charCodeAt(0);
    const lower = '0'.charCodeAt(0);
    const upper = '9'.charCodeAt(0);
    return (c >= lower && c <= upper); // greater or less than unicode of 0 and 9
}

export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split(""); // every character has its own array

    while (src.length > 0) {
        const current = src[0];
        if (current === undefined) {
            break;
        }

    // continue building tokens undtil end of file
        if (current == '(') {
            tokens.push(token(src.shift()!, TokenType.OpenParen));
        } else if (current == ')') {
            tokens.push(token(src.shift()!, TokenType.CloseParen));
        } 
        else if (current == '{') {
            tokens.push(token(src.shift()!, TokenType.OpenBrace));
        }
        else if (current == '}') {
            tokens.push(token(src.shift()!, TokenType.CloseBrace));
        } else if (current == ')') {
            tokens.push(token(src.shift()!, TokenType.CloseParen));
        }
        else if (current == '[') {
            tokens.push(token(src.shift()!, TokenType.OpenBracket));
        } else if (current == ']') {
            tokens.push(token(src.shift()!, TokenType.CloseBracket));
        }
        else if (current == '.') {
            tokens.push(token(src.shift()!, TokenType.Dot));
        }
        else if (current == '+' || current == '-' || current == '*' || current == '/' || current == '%') {
            tokens.push(token(src.shift()!, TokenType.BinaryOperator));
        }
        else if (current == '=') {
            tokens.push(token(src.shift()!, TokenType.Equals));
        } 
        else if (current == ';') {
            tokens.push(token(src.shift()!, TokenType.Semicolon));
        }
        else if (current == ':') {
            tokens.push(token(src.shift()!, TokenType.Colon));
        }
        else if (current == ',') {
            tokens.push(token(src.shift()!, TokenType.Comma));
        }
        else {
            // handles multi character tokes
            if (isint(current)) {
                let num = "";
                while (src.length > 0 && src[0] !== undefined && isint(src[0])) {
                    num += src.shift()!;
                }

                tokens.push(token(num, TokenType.Number));
            } else if (isalpha(current))  {
                let ident = "";
                while (src.length > 0 && src[0] !== undefined && isalpha(src[0])) {
                    ident += src.shift()!;
                }

                // check for reserved tokens(keywords)
                const reserved = KEYWORD[ident];
                if (typeof reserved == "number") {
                    tokens.push(token(ident, reserved));
                }
                else if (reserved == undefined) {
                    tokens.push(token(ident, TokenType.Identifier));
                } 

            } else if (isskippable(current)) {
                src.shift(); // skip the character
            } else {
                throw new Error(`Unrecognized character found ${current}`);
            }
        }
    }

    tokens.push({type: TokenType.EOF, value: "EndOfFile"});
    return tokens;
}