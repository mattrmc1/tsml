import { Matrix } from "../../../math/matrix/Matrix";
import { instance_Subtract_Fail, instance_Subtract_Pass, static_Subtract_Fail, static_Subtract_Pass } from "../data/subtraction.data";

describe("Matric Static Subtraction", () => {

  // Passing Tests
  static_Subtract_Pass.forEach( data => {
    test(data.description, () => {
      const matrix = Matrix.Subtract(data.left, data.right);
      expect(matrix.data).toStrictEqual(data.expected);
    })
  })

  // Failing Tests
  static_Subtract_Fail.forEach( data => {
    test(data.description, () => {
      expect(() => Matrix.Subtract(data.left, data.right)).toThrow(data.errorMessage);
    })
  })

  // Specific Tests
  test("Matrices passed in as parameters should NOT be mutated", () => {

    // Arrange
    const m = new Matrix(2,3).map(x => 5);
    const n = new Matrix(2,3).map(x => 3);

    // Act
    const actual = Matrix.Subtract(m, n);

    // Assert
    expect(m.data).toStrictEqual( [[5,5,5],[5,5,5]] );
    expect(n.data).toStrictEqual( [[3,3,3],[3,3,3]] );
    expect(actual.data).toStrictEqual( [[2,2,2],[2,2,2]] );
  })
})

describe("Matric Instance Subtraction", () => {

  // Passing Tests
  instance_Subtract_Pass.forEach(({ description, self, param, expected }) => {
    test(description, () => {
      expect(self.substract(param).data).toStrictEqual(expected);
    })
  })

  // Failing Tests
  instance_Subtract_Fail.forEach( data => {
    test(data.description, () => {
      expect(() => data.self.substract(data.param)).toThrow(data.errorMessage);
    })
  })

  // Edge Cases
  test("Chained subtractions should persist in state", () => {

    const matrix = new Matrix(2,3).map(x => 10);
    const s = new Matrix(2,3).map(x => 1);
    const expected = new Matrix(2,3).map(x => 7);

    matrix
      .substract(s)
      .substract(s)
      .substract(s);

    expect(matrix.data).toStrictEqual(expected.data);
  })
})