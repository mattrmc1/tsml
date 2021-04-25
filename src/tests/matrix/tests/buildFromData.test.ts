import { Matrix } from "../../../math/matrix/Matrix";
import { BuildFromData_Fail, BuildFromData_Pass } from "../data/buildFromData.data";

describe("Matrix Static BuildFromData", () => {

  // Passing
  BuildFromData_Pass.forEach(({ description, data, rows, cols }) => {
    test(description, () => {
      const matrix = Matrix.BuildFromData(data);
      expect(matrix.data).toStrictEqual(data);
      expect(matrix.rows).toEqual(rows);
      expect(matrix.cols).toEqual(cols);
    })
  });

  // Failing
  BuildFromData_Fail.forEach(({ description, data, errorMessage }) => {
    test(description, () => {
      expect(() => Matrix.BuildFromData(data)).toThrowError(errorMessage);
    })
  })
})