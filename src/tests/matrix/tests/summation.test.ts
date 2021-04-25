import { Matrix } from "../../../math/matrix/Matrix";
import { Summation_Fail, Summation_Pass } from "../data/summation.data";

describe("Matrix Static Addition", () => {

  // Passing Tests
  Summation_Pass.forEach(({ description, input, expected }) => {
    test(description, () => {
      expect(Matrix.Summation(input)).toStrictEqual(expected);
    })
  })

  // Failing Tests
  Summation_Fail.forEach(({ description, input, errorMessage}) => {
    test(description, () => {
      expect(() => Matrix.Summation(input)).toThrow(errorMessage);
    })
  })

  // Specific Tests
  test("Non-square matrices should PASS", () => {

    let i = 0;
    const matrix = new Matrix(3,5).map(x => { i++; return i; });
    const expected = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14 + 15;

    const actual = Matrix.Summation(matrix);

    expect(actual).toStrictEqual(expected);
  })

  test("Matrices passed in as parameters should NOT be mutated", () => {

    const rows = 2;
    const cols = 3;
    const value = 1;

    const matrix = new Matrix(rows, cols).map(x => value);

    Matrix.Summation(matrix);

    expect(matrix.rows).toStrictEqual(rows);
    expect(matrix.cols).toStrictEqual(cols);
    expect(matrix.data).toStrictEqual([ [1,1,1],[1,1,1] ]);
  })
});