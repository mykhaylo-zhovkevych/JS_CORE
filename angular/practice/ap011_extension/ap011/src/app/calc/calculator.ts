type BinaryOp = (a: number, b: number) => number;
export type OpMap = Record<string, BinaryOp>;

export class Calculator {
  public first = 0;
  public second = 0;
  protected result?: number;

  protected ops: OpMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  get operations(): string[] {
    return Object.keys(this.ops);
  }

  get last(): number | undefined {
    return this.result;
  }

  public calculate(op: string): number {
    const fn = this.ops[op];
    if (!fn) throw new Error(`Unsupported operation "${op}"`);
    return (this.result = fn(this.first, this.second));
  }
}
