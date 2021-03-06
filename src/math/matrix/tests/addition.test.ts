import { Matrix } from "../Matrix"
import {
  static_Add_Pass,
  static_Add_Fail,
  instance_Add_Pass,
  instance_Add_Fail
} from './addition.data';

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

    expect(actual.data).toStrictEqual( [[5,5,5],[5,5,5]] );
    expect(m.data).toStrictEqual( [[2,2,2],[2,2,2]] );
    expect(n.data).toStrictEqual( [[3,3,3],[3,3,3]] );

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
})

