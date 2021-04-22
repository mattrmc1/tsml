import { Matrix } from "../../../math/matrix/Matrix";
import { BuildFromArray_Fail, BuildFromArray_Pass } from "../data/buildFromArray.data";

describe("Matrix Static BuildFromArray", () => {

  // Passing Tests
  BuildFromArray_Pass.forEach(({ description, input, expected }) => {
    test(description, () => {
      const matrix = Matrix.BuildFromArray(input);
      expect(matrix.data).toStrictEqual(expected);
    })
  });

  // Failing Tests
  BuildFromArray_Fail.forEach(({ description, input, errorMessage }) => {
    test(description, () => {
      expect(() => Matrix.BuildFromArray(input)).toThrow(errorMessage)
    })
  })
})