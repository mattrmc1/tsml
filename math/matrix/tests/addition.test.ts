// Static Add: If dimensions are good
// Static Add: If dimensions are bad
// Static Add: Neither params are mutated

import { Matrix } from "../Matrix"
import { staticAdditionFail, staticAdditionPass } from "./addition.data"


describe("Static Matrix.Add", () => {

  staticAdditionPass.forEach( data => {
    test(data.description, () => {
      const matrix = Matrix.Add(data.m, data.n);
      expect(matrix.data).toStrictEqual(data.expected);
    })
  })

  staticAdditionFail.forEach( data => {
    test(data.description, () => {
      expect(() => Matrix.Add(data.m, data.n)).toThrow(data.errorMessage);
    })
  })

  test("Test that matrices aren't mutated on static add", () => {

    // Arrange
    let m = new Matrix(2,3).map(x => 2);
    let n = new Matrix(2,3).map(x => 3);

    // Act
    let actual = Matrix.Add(m, n);

    // Assert
    expect(actual.data).toStrictEqual( [[5,5,5],[5,5,5]] );
    expect(m.data).toStrictEqual( [[2,2,2],[2,2,2]] );
    expect(n.data).toStrictEqual( [[3,3,3],[3,3,3]] );

  })
});

describe("Matrix Instance Addition", () => {

})

