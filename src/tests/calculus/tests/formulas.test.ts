import { cost, deltaCost, deltaSigmoid, sigmoid } from "../../../math/formulas";
import { Matrix } from "../../../math/matrix/Matrix";
import { CostDerivativeFunctionTestData, CostFunctionTestData, SigmoidDerivativeTestData, SigmoidTestData } from "../data/formulas.data";

describe("Formulas | Squeeze Functions", () => {

  describe("Sigmoid General", () => {

    const iterations: number = 30;
    const maximum: number = 20;
    let inputs: number[] = [];

    const distance = (n: number) => Math.abs(0.5 - n);

    beforeEach(() => {
      inputs = [];

      for (let i = 0; i < iterations; i++) {
        inputs.push(Math.random() * maximum);
      }
    })

    test("Sigmoid should squish between 0 and 1", () => {
      inputs.forEach(n => {
        expect(sigmoid(n)).toBeGreaterThanOrEqual(0);
        expect(sigmoid(n)).toBeLessThanOrEqual(1);
      })
    })

    test("Sigmoid derivative should squish between 0 and 0.25", () => {
      inputs.forEach(n => {
        expect(deltaSigmoid(n)).toBeGreaterThanOrEqual(0);
        expect(deltaSigmoid(n)).toBeLessThanOrEqual(0.25);
      })
    })

    test("Sigmoid should have rotational symmetry about the point(0, 0.5)", () => {
      inputs.forEach(n => expect(distance(sigmoid(n))).toBeCloseTo(distance(sigmoid(n * -1))))
    })

    test("Sigmoid derivative should have symmetry about y axis", () => {
      inputs.forEach(n => expect(deltaSigmoid(n)).toBeCloseTo(deltaSigmoid(n * -1)));
    })

  })

  describe("Sigmoid Examples", () => {
    SigmoidTestData.forEach(({ description, input, expected }) => {
      test(description, () => expect(sigmoid(input)).toBeCloseTo(expected))
    })
  })

  describe("Sigmoid Examples (Derivative)", () => {
    SigmoidDerivativeTestData.forEach(({ description, input, expected }) => {
      test(description, () => expect(deltaSigmoid(input)).toBeCloseTo(expected))
    });
  })
})

describe("Formulas | Cost Functions", () => {

  describe("MSE Examples", () => {
    
    CostFunctionTestData.forEach(({ description, input, output }) => {
      test(description, () => {
        const actual: Matrix = cost(input.actual, input.expected);
        expect(actual.data).toEqual(output.data);
      })
    })

    test("Should work correctly with floating point numbers", () => {

      // Arrange
      const costActual = Matrix.BuildFromData([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ]);
      const costExpected = Matrix.BuildFromData([
        [ 1.7, 2.1, 3.2 ],
        [ 4.3, 5.4, 6.8 ]
      ]);
      const expected = Matrix.BuildFromData([
        [ 0.49, 0.01, 0.04 ],
        [ 0.09, 0.16, 0.64 ]
      ]);

      // Act
      const actual = cost(costActual, costExpected);

      // Assert
      expect(actual.rows).toEqual(expected.rows);
      expect(actual.cols).toEqual(expected.cols);
      for(let i = 0; i < actual.rows; i++) {
        for(let j = 0; j < actual.cols; j++) {
          expect(actual.data[i][j]).toBeCloseTo(expected.data[i][j]);
        } 
      }
    })
  })

  describe("MSE Examples (Derivative)", () => {
    
    CostDerivativeFunctionTestData.forEach(({ description, input, output }) => {
      test(description, () => {
        const acutal: Matrix = deltaCost(input.actual, input.expected);
        expect(acutal.data).toEqual(output.data);
      })
    });

    test("(Derivative) Should work correctly with floating point numbers", () => {

      // Arrange
      const costActual = Matrix.BuildFromData([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ]);
      const costExpected = Matrix.BuildFromData([
        [ 1.7, 2.1, 3.2 ],
        [ 4.3, 5.4, 6.8 ]
      ]);
      const expected = Matrix.BuildFromData([
        [ -1.4, -0.2, -0.4 ],
        [ -0.6, -0.8, -1.6 ]
      ]);

      // Act
      const actual = deltaCost(costActual, costExpected);

      // Assert
      expect(actual.rows).toEqual(expected.rows);
      expect(actual.cols).toEqual(expected.cols);
      for(let i = 0; i < actual.rows; i++) {
        for(let j = 0; j < actual.cols; j++) {
          expect(actual.data[i][j]).toBeCloseTo(expected.data[i][j]);
        } 
      }
    })
  })
})