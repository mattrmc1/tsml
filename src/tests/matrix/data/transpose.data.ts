import { Matrix } from "../../../math/matrix/Matrix";
import { GenerateTransposedMatrix } from "../helpers";
import { IMatrixTransposeTestData } from "../interfaces";

export const Transpose_Pass: IMatrixTransposeTestData[] = [
  {
    description: 'Should PASS because reasons',
    input: new Matrix(3, 2).map(x => 1),
    expected: new Matrix(2, 3).map(x => 1)
  },
  ...new Array(10).fill(20).map(GenerateTransposedMatrix)
];

export const Transpose_Fail: IMatrixTransposeTestData[] = [
  {
    description: 'Should FAIL with 0 columns',
    input: new Matrix(3, 0),
    errorMessage: '[Transpose Error] Matrix must have at least 1 row and 1 column'
  },
  {
    description: 'Should FAIL with 0 rows',
    input: new Matrix(0, 3),
    errorMessage: '[Transpose Error] Matrix must have at least 1 row and 1 column'
  },
  {
    description: 'Should FAIL with 0 rows and 0 columns',
    input: new Matrix(0, 0),
    errorMessage: '[Transpose Error] Matrix must have at least 1 row and 1 column'
  }
];