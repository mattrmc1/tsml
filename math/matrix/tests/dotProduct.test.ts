import { Matrix } from "../Matrix";
import { instance_DotProduct_Fail, instance_DotProduct_Pass, static_DotProduct_Fail, static_DotProduct_Pass } from "./dotProduct.data";

describe("Matric Static DotProduct", () => {

  // Passing Tests
  static_DotProduct_Pass.forEach(({ description, left, right, expected }) => {
    test(description, () => {
      const product = Matrix.DotProduct(left, right);
      expect(product.data).toStrictEqual(expected);
    })
  });

  // Failing Tests
  static_DotProduct_Fail.forEach(({ description, left, right, errorMessage }) => {
    test(description, () => {
      expect( () => Matrix.DotProduct(left, right)).toThrow(errorMessage)
    })
  })

  // Edge Cases
  test("Matrices passed in as parameters should NOT be mutated", () => {

    const leftRows = 2;
    const leftCols = 3;
    const rightRows = 3;
    const rightCols = 2;

    // [
    //   [2,2,2],
    //   [2,2,2]
    // ]
    let left = new Matrix(leftRows, leftCols).map(x => 2);

    // [
    //   [3,3],
    //   [3,3],
    //   [3,3]
    // ]
    let right = new Matrix(rightRows, rightCols).map(x => 3);

    // [
    //   [ 18, 18 ],
    //   [ 18, 18 ]
    // ]
    const actual = Matrix.DotProduct(left, right);

    expect(left.rows).toBe(leftRows);
    expect(left.cols).toBe(leftCols);
    expect(right.rows).toBe(rightRows);
    expect(right.cols).toBe(rightCols);

    expect(actual.data).toStrictEqual( [[18,18],[18,18]] );
    expect(left.data).toStrictEqual( [[2,2,2],[2,2,2]] );
    expect(right.data).toStrictEqual( [[3,3],[3,3],[3,3]] );
  })
})

describe("Matric Instance Multiply", () => {

  // Passing Tests
  instance_DotProduct_Pass.forEach(({ description, self, param, expected }) => {
    test(description, () => {
      self.multiply(param);
      expect(self.data).toStrictEqual(expected);
    })
  });

  // Failing Tests
  instance_DotProduct_Fail.forEach(({ description, self, param, errorMessage }) => {
    test(description, () => {
      expect(() => self.multiply(param)).toThrow(errorMessage)
    })
  })

  // Edge Cases
  test("Scalar multiplication", () => {
    const actual = new Matrix(3,5).map(x => 2).multiply(25);
    const expected = new Matrix(3,5).map(x => 50);

    expect(actual.data).toStrictEqual(expected.data);
  })
})