import { DeltaHandler } from "../DeltaHandler";
import { Matrix } from "../matrix/Matrix";

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

  const deltaHandler = new DeltaHandler(
    inputActivation[0],
    activations,
    weights,
    biases,
    expected
  );

  for (let i = weights.length - 1; i >= 0; i--) {

    const { deltaWeight, deltaBias} = deltaHandler.calculateDelta(i);
    deltaWeights.push(deltaWeight);
    deltaBiases.push(deltaBias);

  }

  deltaWeights.reverse();
  deltaBiases.reverse();

  return { deltaWeights, deltaBiases }
}