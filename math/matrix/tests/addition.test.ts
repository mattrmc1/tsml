import { Matrix } from "../Matrix"
import { MatrixAlt } from "../MatrixAlt";
import { staticAdditionFail, staticAdditionPass } from "./addition.data"


describe("Static Matrix.Add", () => {

  // Passing Tests
  staticAdditionPass.forEach( data => {
    test(data.description, () => {
      const matrix = Matrix.Add(data.m, data.n);
      expect(matrix.data).toStrictEqual(data.expected);
    })
  })

  // Failing Tests
  staticAdditionFail.forEach( data => {
    test(data.description, () => {
      expect(() => Matrix.Add(data.m, data.n)).toThrow(data.errorMessage);
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

  // Matrix ALT
  test("MatrixALT addition", () => {

    let i = 0;
    const mapper = (x: number) => { i++; return x + i; }
    let m = new MatrixAlt(2,3).map(mapper);
    let n = new MatrixAlt(2,3).map(mapper);

    let actual = MatrixAlt.Add(m,n);

    expect(m.data).toStrictEqual( [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ] );
    expect(n.data).toStrictEqual( [ [ 7, 8 ], [ 9, 10 ], [ 11, 12 ] ] );
    expect(actual.data).toStrictEqual( [ [ 8, 10 ], [ 12, 14 ], [ 16, 18 ] ] );
  })

});

describe("Matrix Instance Addition", () => {

})

