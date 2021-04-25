import { Matrix } from "../../../math/matrix/Matrix"
import { Transpose_Fail, Transpose_Pass } from "../data/transpose.data"

describe("Matric Static Transpose", () => {

  // Passing Tests
  Transpose_Pass.forEach(({ description, input, expected }) => {
    test(description, () => {
      expect(Matrix.Transpose(input).data).toStrictEqual(expected.data)
    })
  })

  // Failing Tests
  Transpose_Fail.forEach(({ description, input, errorMessage }) => {
    test(description, () => {
      expect(() => Matrix.Transpose(input)).toThrow(errorMessage);
    })
  })
})