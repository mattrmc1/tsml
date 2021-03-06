import { Matrix } from "../Matrix";
import { BuildFromArray_Fail, BuildFromArray_Pass } from "./buildFromArray.data";

describe("Matrix Static BuildFromArray", () => {

  // Passing Tests
  BuildFromArray_Pass.forEach( data => {
    test(data.description, () => {
      const matrix = Matrix.BuildFromArray(data.input);
      expect(matrix.data).toStrictEqual(data.expected);
    })
  });

  // Failing Tests
  BuildFromArray_Fail.forEach( data => {
    test(data.description, () => {
      expect(() => Matrix.BuildFromArray(data.input)).toThrow(data.errorMessage)
    })
  })
})