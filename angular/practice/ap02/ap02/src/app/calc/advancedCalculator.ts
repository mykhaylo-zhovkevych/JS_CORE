import { Calculator, OpMap } from './calculator';

export type UnaryOp = (x: number) => number;

export class AdvancedCalculator extends Calculator {

  // extra binary operations, merged into the inherited `ops` map
  private static readonly extraOps: OpMap = {
    '^':   (a, b) => a ** b,
    'mod': (a, b) => a % b,
    'root': (a, b) => Math.pow(a, 1 / b),
  };

  // operations that need only one operand -> they work on the inherited `result`
  private unaryOps: Record<string, UnaryOp> = {
    'sqrt':   Math.sqrt,
    'square': x => x * x,
    'negate': x => -x,
  };

  private memory = 0;
  public history: string[] = [];

  constructor() {
    super();
    this.ops = { ...this.ops, ...AdvancedCalculator.extraOps };
  }

  get unaryOperations(): string[] {
    return Object.keys(this.unaryOps);
  }

  get memoryValue(): number { return this.memory; }
  set memoryValue(value: number) { this.memoryValue = value; }

  // override to record history, still delegates the math to the base class
  public override calculate(op: string): number {
    const r = super.calculate(op);
    this.history.push(`${this.first} ${op} ${this.second} = ${r}`);
    //console.log(this.history);
    return r;
  }

  public apply(op: string): number {
    const fn = this.unaryOps[op];
    if (!fn) throw new Error(`Unsupported unary operation "${op}"`);
    const input = this.result ?? this.first;
    this.result = fn(input);
    this.history.push(`${op}(${input}) = ${this.result}`);
    return this.result;
  }

  public memoryRecall(): void { this.first = this.memory; }
  public memoryClear(): void { this.memory = 0; }

  public clear() {
    this.first = this.second = 0;
    this.result = undefined;
    this.history = [];
  }
}
