import { Matrix } from "../../../math/matrix/Matrix";
import { HadamardProduct_Fail, HadamardProduct_Pass } from "../data/hadamard.data";

describe("Matric Static Hadamard Product", () => {

  // Passing Tests
  HadamardProduct_Pass.forEach(({ description, left, right, expected }) => {
    test(description, () => {
      const product = Matrix.HadamardProduct(left, right);
      expect(product.data).toStrictEqual(expected);
    })
  });

  // Failing Tests
  HadamardProduct_Fail.forEach(({ description, left, right, errorMessage }) => {
    test(description, () => {
      expect( () => Matrix.HadamardProduct(left, right)).toThrow(errorMessage)
    })
  })

  // Edge Cases
  test("Matrices passed in as parameters should NOT be mutated", () => {

    let left = new Matrix(2, 3).map(x => 2);
    let right = new Matrix(2, 3).map(x => 3);
    const actual = Matrix.HadamardProduct(left, right);

    expect(left.rows).toBe(2);
    expect(left.cols).toBe(3);
    expect(right.rows).toBe(2);
    expect(right.cols).toBe(3);

    expect(actual.data).toStrictEqual( [[6,6,6], [6,6,6]] );
    expect(left.data).toStrictEqual( [[2,2,2], [2,2,2]] );
    expect(right.data).toStrictEqual( [[3,3,3], [3,3,3]] );
  })
})