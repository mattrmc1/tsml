import { Matrix } from "./matrix/Matrix";
import { MatrixStatic } from "./matrix/MatrixStatic";

export const sigmoid = (x: number) => 1 / ( 1 + Math.exp(-x) );
export const deltaSigmoid = (x: number) => sigmoid(x) * ( 1 - sigmoid(x) );

// C = (a(L) - y)^2
export const cost = (actual: Matrix, expected: Matrix) => Matrix.Subtract(actual, expected).map(m => m * m);

// C' = 2(a(L) - y)
export const deltaCost = (actual: Matrix, expected: Matrix) => Matrix.Subtract(actual, expected).map(m => 2 * m);

/**
 * Change to cost function in respect to given activation layer
 * 
 * ∑ w(L+1) * o'(z(L+1)) * dC/dA(L + 1) OR 2(a(L) - y)
 */
export const dCdA = (
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
  const delta = dCdA(
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

/**
 * Change to cost function in respect to given weights layer
 */
export const dCdW = (
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
  const deltaCostTo_aL = dCdA(
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

/**
 * Change to cost function in respect to given biases layer
 */
export const dCdB = (
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
  return Matrix.HadamardProduct(dCdA(
    activations,
    weights,
    biases,
    l,
    y
  ), zL.map(deltaSigmoid));
}

export const calculateDeltas = (
  activations: Matrix[],
  weights: Matrix[],
  biases: Matrix[],
  expected: Matrix
): {
  deltaWeights: Matrix[],
  deltaBiases: Matrix[]
 } => {

  const inputActivation: Matrix[] = [...activations];
  activations = inputActivation.splice(1);

  const deltaWeights: Matrix[] = [];
  const deltaBiases: Matrix[] = [];

  for (let i = weights.length - 1; i >= 0; i--) {

    // -- Weights --
    // w_jk = weight attached to k-th neuron (left) and j-th neuron (right)
    // How bad was the last activation layer?
    
    deltaWeights.push(dCdW(inputActivation[0], activations, weights, biases, i, expected));
    deltaBiases.push(dCdB(inputActivation[0], activations, weights, biases, i, expected));
  }
  
  deltaWeights.reverse();
  deltaBiases.reverse();

  return { deltaWeights, deltaBiases }
}