import { Matrix } from "../../../math/matrix/Matrix";
import { DotProduct_Fail, DotProduct_Pass } from "../data/dotProduct.data";

describe("Matric Static DotProduct", () => {

  // Passing Tests
  DotProduct_Pass.forEach(({ description, left, right, expected }) => {
    test(description, () => {
      const product = Matrix.DotProduct(left, right);
      expect(product.data).toStrictEqual(expected);
    })
  });

  // Failing Tests
  DotProduct_Fail.forEach(({ description, left, right, errorMessage }) => {
    test(description, () => {
      expect( () => Matrix.DotProduct(left, right)).toThrow(errorMessage)
    })
  })

  // Specific Case
  test("(2x3 and 3x2 specific test)", () => {

    let i = 0;
    const mapper = x => { i++; return i; }
    
    let left = new Matrix(2, 3).map(mapper);
    let right = new Matrix(3, 2).map(mapper);
    const product = Matrix.DotProduct(left, right);

    const expectedLeft = [
      [ 1, 2, 3 ],
      [ 4, 5, 6 ]
    ];

    const expectedRight = [
      [ 7, 8 ],
      [ 9, 10 ],
      [ 11, 12 ]
    ];

    const expectedProduct = [
      [ 58, 64 ],
      [ 139, 154 ]
    ];

    expect(left.data).toStrictEqual(expectedLeft);
    expect(right.data).toStrictEqual(expectedRight);
    expect(product.data).toStrictEqual(expectedProduct);
  })

  // Edge Case
  test("Matrices passed in as parameters should NOT be mutated", () => {

    let left = new Matrix(2, 3).map(x => 2);
    let right = new Matrix(3, 2).map(x => 3);
    const actual = Matrix.DotProduct(left, right);

    expect(left.rows).toBe(2);
    expect(left.cols).toBe(3);
    expect(right.rows).toBe(3);
    expect(right.cols).toBe(2);

    expect(actual.data).toStrictEqual([ [18,18], [18,18] ]);
    expect(left.data).toStrictEqual([ [2,2,2], [2,2,2] ]);
    expect(right.data).toStrictEqual([ [3,3], [3,3], [3,3] ]);
  })
});