import { Matrix } from "../matrix/Matrix";
import { deltaCostToActivity } from "./deltaCostActivity";
import { deltaSigmoid } from "./squeeze-functions";

export const deltaCostToWeight = (
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
  const wL = weights[l]

  // b(L) = these biases (on right activation layer)
  const bL = biases[l];

  // z(L) = w(L) * a(L-1) + b(L)
  const zL = Matrix.DotProduct(wL, aL_1).add(bL);

  // dC/dA = change in cost function in respect to right activation layer
  const deltaCostTo_aL = deltaCostToActivity(
    activations,
    weights,
    biases,
    l,
    y
  );

  // return: a(L-1) * sigmoidPrime(z(L)) * dC/dA
  return Matrix.DotProduct(
    Matrix.HadamardProduct(deltaCostTo_aL, zL.map(deltaSigmoid)),
    Matrix.Transpose(aL_1)
  );
}