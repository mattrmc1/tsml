import { Matrix } from "./matrix/Matrix";

export const sigmoid = (x: number) => 1 / ( 1 + Math.exp(-x) );
export const deltaSigmoid = (x: number) => sigmoid(x) * ( 1 - sigmoid(x) );

// C = (a(L) - y)^2
export const cost = (actual: Matrix, expected: Matrix) => Matrix.Subtract(actual, expected).map(m => m * m);

// C' = 2(a(L) - y)
export const deltaCost = (actual: Matrix, expected: Matrix) => Matrix.Subtract(actual, expected).map(m => 2 * m);

/**
 * Change to cost function in respect to given activation layer
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
  console.log('aL', aL.data);

  // If last activation layer, return 2(a(L) - y)
  if (l === activations.length - 1)
    return deltaCost(aL, y);
  
  // w(L+1) = weights to the right
  const wR: Matrix = weights[l + 1]
  console.log('wR', wR.data);

  // z(L+1) = w(L+1) * (a(L)) + b(L+1)
  const zL: Matrix = Matrix.DotProduct(wR, aL).add(biases[l + 1])
  console.log('zL', zL.data);
  
  // dC/dA(L+1) = change in cost function in respect to right activation layer
  // return: ∑ w(L+1) * sigmoidPrime(z(L+1)) * dC/dA(L+1)
  return Matrix.DotProduct(
    Matrix.DotProduct(
      wR,
      Matrix.Map(zL, deltaSigmoid)
    ),
    dCdA(
      activations,
      weights,
      biases,
      l + 1,
      y)
  );
}

/**
 * Change to cost function in respect to given weights layer
 */
export const dCdW = (
  activations: Matrix[],
  weights: Matrix[],
  biases: Matrix[],
  l: number, // Layer Index
  y: Matrix
): Matrix => {

  // a(L-1) = left activation layer
  const aL_1 = activations[l - 1];
  console.log('aL_1', aL_1.data);
  // w(L) = these weights
  const wL = weights[l];
  console.log('wL', wL.data);
  // b(L) = these biases (on right activation layer)
  const bL = biases[l];
  console.log('bL', bL.data);
  // z(L) = w(L) * a(L-1) + b(L)
  const zL = Matrix.DotProduct(wL, aL_1).add(bL);
  console.log('zL', zL.data);

  // dC/dA = change in cost function in respect to right activation layer

  // return: a(L-1) * sigmoidPrime(z(L)) * dC/dA
  const test = Matrix.DotProduct(
    aL_1,
    Matrix.Map(zL, deltaSigmoid)
  );
  console.log('test', test.data);
  const wut = dCdA(
    activations,
    weights,
    biases,
    l,
    y
  );
  console.log(wut);
  
  return Matrix.DotProduct(
    Matrix.DotProduct(
      aL_1,
      Matrix.Map(zL, deltaSigmoid)
    ),
    dCdA(
      activations,
      weights,
      biases,
      l,
      y
    )
  );
}

/**
 * Change to cost function in respect to given biases layer
 */
export const dCdB = (
  activations: Matrix[],
  weights: Matrix[],
  biases: Matrix[],
  l: number, // Layer Index
  y: Matrix
): Matrix => {

  // a(L-1) = left activation layer
  const aL_1 = activations[l - 1];
  // w(L) = these weights
  const wL = weights[l];
  // b(L) = these biases (on right activation layer)
  const bL = biases[l];
  // z(L) = w(L) * a(L-1) + b(L)
  const zL = Matrix.DotProduct(wL, aL_1).add(bL);

  // return: 1 * sigmoidPrime(z(L) * dC/dA)
  return Matrix.DotProduct(
    zL.map(deltaSigmoid),
    dCdA(
      activations,
      weights,
      biases,
      l,
      y
    )
  );
}

export const calculateWeightDeltas = (
  activations: Matrix[],
  weights: Matrix[],
  biases: Matrix[],
  expected: Matrix
): Matrix[] => {

  let weightDeltas: Matrix[] = [];

  // loop backwards? through weights
  for (let i = weights.length - 1; i > -1; i--) {
    weightDeltas.push(dCdW(activations, weights, biases, weights.length - 1 - i, expected));
  }

  // for (let i = 0; i < weights.length; i++) {
  //   weightDeltas.push(dCdW(activations, weights, biases, i, expected));
  // }

  return weightDeltas.reverse();
}

export const calculateBiasDeltas = (
  activations: Matrix[],
  weights: Matrix[],
  biases: Matrix[],
  expected: Matrix
): Matrix[] => {

  let biasDeltas: Matrix[] = [];

  // loop backwards through biases
  for (let i = biases.length - 1; i > -1; i--) {
    biasDeltas.push(dCdB(activations, weights, biases, i, expected))
  }

  return biasDeltas.reverse();
}