import { Matrix } from "../../../math/matrix/Matrix";
import { instance_Add_Fail, instance_Add_Pass, static_Add_Fail, static_Add_Pass } from "../data/addition.data";

describe("Matrix Static Addition", () => {

  // Passing Tests
  static_Add_Pass.forEach( data => {
    test(data.description, () => {
      const matrix = Matrix.Add(data.left, data.right);
      expect(matrix.data).toStrictEqual(data.expected);
    })
  })

  // Failing Tests
  static_Add_Fail.forEach( data => {
    test(data.description, () => {
      expect(() => Matrix.Add(data.left, data.right)).toThrow(data.errorMessage);
    })
  })

  // Specific Tests
  test("Matrices passed in as parameters should NOT be mutated", () => {

    let m = new Matrix(2,3).map(x => 2);
    let n = new Matrix(2,3).map(x => 3);

    let actual = Matrix.Add(m, n);

    expect(m.data).toStrictEqual( [[2,2,2],[2,2,2]] );
    expect(n.data).toStrictEqual( [[3,3,3],[3,3,3]] );
    expect(actual.data).toStrictEqual( [[5,5,5],[5,5,5]] );
  })
});

describe("Matrix Instance Addition", () => {

  // Passing Tests
  instance_Add_Pass.forEach( data => {
    test(data.description, () => {
      data.self.add(data.param);
      expect(data.self.data).toStrictEqual(data.expected);
    })
  });

  // Failing Tests
  instance_Add_Fail.forEach( data => {
    test(data.description, () => {
      expect(() => data.self.add(data.param)).toThrow(data.errorMessage);
    })
  })

  // Edge Cases
  test("Chained additions should persist in state", () => {

    const matrix = new Matrix(2,3).map(x => 10);
    const s = new Matrix(2,3).map(x => 1);
    const expected = new Matrix(2,3).map(x => 13);

    matrix
      .add(s)
      .add(s)
      .add(s);

    expect(matrix.data).toStrictEqual(expected.data);
  })

  test("Matrix added by a scalar should succeed", () => {
    const matrix = new Matrix(2,3).map(x => 10);
    const expected = new Matrix(2,3).map(x => 13);

    matrix
      .add(1)
      .add(1)
      .add(1);

    expect(matrix.data).toStrictEqual(expected.data);
  })
})

