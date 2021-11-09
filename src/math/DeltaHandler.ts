import { deltaCost, deltaSigmoid } from './formulas';
import { Matrix } from './matrix/Matrix';

export class DeltaHandler {
  private input: Matrix;
  private a: Matrix[];
  private w: Matrix[];
  private b: Matrix[];
  private y: Matrix;

  constructor(input: Matrix, activations: Matrix[], weights: Matrix[], biases: Matrix[], expected: Matrix) {
    this.input = input;
    this.a = activations;
    this.w = weights;
    this.b = biases;
    this.y = expected;
  }

  private dCdA(l: number): Matrix {
    // If last layer
    if (l === this.a.length - 1) return deltaCost(this.a[l], this.y);

    // z(L+1) = w(L+1) * (a(L)) + b(L+1)
    const zL_1: Matrix = Matrix.DotProduct(this.w[l + 1], this.a[l]).add(this.b[l + 1]);

    // dCdA = w(l+1)^T * dCdA(l+1) * S'(z(l+1))
    return Matrix.DotProduct(
      Matrix.Transpose(this.w[l + 1]),
      Matrix.HadamardProduct(this.dCdA(l + 1), zL_1.map(deltaSigmoid))
    );
  }

  /**
   * Takes in a target layer, back propagates to the input layer, and calculates the deltas for the weights and biases of the target layer
   * @param l Target Layer Index
   * @returns Deltas corresponding to changes needed to be made to weights and biases matrices
   */
  public calculateDelta = (l: number): { deltaWeight: Matrix; deltaBias: Matrix } => {
    // Get previous activation layer | a(L-1)
    const prevA = l > 0 ? this.a[l - 1] : this.input;

    // z(L) = w(L) * a(L-1) + b(L)
    const zL = Matrix.DotProduct(this.w[l], prevA).add(this.b[l]);

    const deltaBias = Matrix.HadamardProduct(this.dCdA(l), zL.map(deltaSigmoid));

    const deltaWeight = Matrix.DotProduct(deltaBias, Matrix.Transpose(prevA));

    return { deltaWeight, deltaBias };
  };
}
