import { Matrix } from "../matrix/Matrix";
import { deltaCostToActivity } from "./deltaCostActivity";
import { deltaSigmoid } from "./squeeze-functions";

/**
 * Change to cost function in respect to given biases layer
 * @param inputLayer 
 * @param activations 
 * @param weights 
 * @param biases 
 * @param l 
 * @param y 
 */
export const deltaCostToBias = (
  inputLayer: Matrix,
  activations: Matrix[],
  weights: Matrix[],
  biases: Matrix[],
  l: number, // Layer Index
  y: Matrix
): Matrix => {

  // a(L-1) = left activation layer
  const aL_1 = l > 0 ? activations[l - 1] : inputLayer
  // w(L) = these weights
  const wL = weights[l];
  // b(L) = these biases (on right activation layer)
  const bL = biases[l];
  // z(L) = w(L) * a(L-1) + b(L)
  const zL = Matrix.DotProduct(wL, aL_1).add(bL);

  // return: 1 * sigmoidPrime(z(L) * dC/dA)
  return Matrix.HadamardProduct(deltaCostToActivity(
    activations,
    weights,
    biases,
    l,
    y
  ), zL.map(deltaSigmoid));
}