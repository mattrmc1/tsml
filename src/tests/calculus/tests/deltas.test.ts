import { DeltaHandler } from "../../../math/DeltaHandler";
import { calculateDeltas } from "../../../math/formulas";
import { Matrix } from "../../../math/matrix/Matrix";
import { PerfectMatrixDelta } from "../data/deltas.data";

describe("Calculating Deltas", () => {

  test(
    "Given a perfect match of expected output, " + 
    "When calculating delta with delta handler, " +
    "Then all deltas should be zero", () => {

      // Arrange
      const { input, hidden, output, weights, biases, y } = PerfectMatrixDelta;
      const activations = [ ...hidden, output ];
      const handler = new DeltaHandler(input, activations, weights, biases, y);

      // Act
      // Assert
      for (let i = weights.length - 1; i >= 0; i--) {

        const { deltaWeight, deltaBias } = handler.calculateDelta(i);

        deltaWeight.forEach(n => expect(n).toEqual(0));
        deltaBias.forEach(n => expect(n).toEqual(0));
      }
    })

  test(
    "Given a perfect match of expected output, " + 
    "When calculating deltas, " +
    "Then all deltas and costError should be zero", () => {

      // Arrange
      const { input, hidden, output, weights, biases, y } = PerfectMatrixDelta;
      const activations: Matrix[] = [ input, ...hidden, output ];
      const expectedCost: Matrix = new Matrix(2, 1).map(n => 0);

      // Act
      const { deltaWeights, deltaBiases, costError } = calculateDeltas(activations, weights, biases, y);

      // Assert
      expect(costError.data).toStrictEqual(expectedCost.data);
      deltaWeights.forEach(w => w.forEach(n => expect(n).toEqual(0)));
      deltaBiases.forEach(b => b.forEach(n => expect(n).toEqual(0)));

    })
})