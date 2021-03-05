import { Matrix } from "../matrix/Matrix";
import { deltaCost } from "./cost-functions";
import { deltaSigmoid } from "./squeeze-functions";

/**
 * This is more of a reference at this point
 * 
 * dCdA = w(l+1)^T * dCdA(l+1) * S'(z(l+1))
 */
export const deltaCostToActivity = (
  activations: Matrix[],
  weights: Matrix[],
  biases: Matrix[],
  l: number, // Layer Index
  y: Matrix
): Matrix => {

  // a(L) = this activation layer
  const aL: Matrix = activations[l];

  // If right-most layer, return 2(a(L) - y)
  if (l === activations.length - 1) {
    return deltaCost(aL, y);
  }

  // w(L+1) = weights to the right
  const wL_1: Matrix = weights[l + 1];

  // z(L+1) = w(L+1) * (a(L)) + b(L+1)
  const zL_1: Matrix = Matrix.DotProduct(wL_1, aL).add(biases[l + 1]);

  // deltaCost / a(L + 1)
  const delta = deltaCostToActivity(
    activations,
    weights,
    biases,
    l + 1,
    y
  );

  return Matrix.DotProduct(
    Matrix.Transpose(wL_1),
    Matrix.HadamardProduct(
      delta,
      zL_1.map(deltaSigmoid)
    )
  );
}
