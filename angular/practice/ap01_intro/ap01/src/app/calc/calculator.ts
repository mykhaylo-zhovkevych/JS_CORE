type BinaryOp = (a: number, b: number) => number;
export type OpMap = Record<string, BinaryOp>;

export class Calculator {
  public first = 0;
  public second = 0;
  protected result?: number;

  // instance field (not static) so a subclass can extend it in its constructor
  protected ops: OpMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  // derived from the map -> no second list to keep in synchronization
  get operations(): string[] {
    return Object.keys(this.ops);
  }

  get last(): number | undefined {
    return this.result;
  }

  // stateless
  public calculate(op: string): number {
    const fn = this.ops[op];
    if (!fn) throw new Error(`Unsupported operation "${op}"`);
    return (this.result = fn(this.first, this.second));
  }
}
