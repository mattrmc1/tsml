import { Matrix } from "../../../math/matrix/Matrix";
import { IMatrixMathInstanceTestData, IMatrixMathStaticTestData } from "../interfaces";

export const static_Subtract_Pass: IMatrixMathStaticTestData[] = [
  {
    description: 'Should PASS with two 2x2 matrices',
    left: new Matrix(2, 2).map(x => 101),
    right: new Matrix(2, 2).map(x => 100),
    expected: new Matrix(2, 2).map(x => 1).data
  },
  {
    description: 'Should PASS with two 1x1 matrices',
    left: new Matrix(1, 1).map(x => 1),
    right: new Matrix(1, 1).map(x => 1),
    expected: new Matrix(1, 1).map(x => 0).data
  },
  {
    description: 'Should PASS with two 10x8 matrices',
    left: new Matrix(10, 8).map(x => 100),
    right: new Matrix(10, 8).map(x => 95),
    expected: new Matrix(10, 8).map(x => 5).data
  }
];

export const static_Subtract_Fail: IMatrixMathStaticTestData[] = [
  {
    description: 'Should FAIL with 1x2 + 2x2',
    left: new Matrix(1, 2),
    right: new Matrix(2, 2),
    errorMessage: "[Subtraction Error] Matrices must have the same dimensions"
  },
  {
    description: 'Should FAIL with 1x2 + 1x1',
    left: new Matrix(1, 2),
    right: new Matrix(1, 1),
    errorMessage: "[Subtraction Error] Matrices must have the same dimensions"
  },
  {
    description: 'Should FAIL with 10x8 + 8x10',
    left: new Matrix(5, 4),
    right: new Matrix(4, 5),
    errorMessage: "[Subtraction Error] Matrices must have the same dimensions"
  }
];

export const instance_Subtract_Pass: IMatrixMathInstanceTestData[] = [
  {
    description: 'Should PASS with two 2x2 matrices',
    self: new Matrix(2, 2).map(x => 101),
    param: new Matrix(2, 2).map(x => 100),
    expected: new Matrix(2, 2).map(x => 1).data
  },
  {
    description: 'Should PASS with two 1x1 matrices',
    self: new Matrix(1, 1).map(x => 1),
    param: new Matrix(1, 1).map(x => 1),
    expected: new Matrix(1, 1).map(x => 0).data
  },
  {
    description: 'Should PASS with two 10x8 matrices',
    self: new Matrix(10, 8).map(x => 100),
    param: new Matrix(10, 8).map(x => 95),
    expected: new Matrix(10, 8).map(x => 5).data
  }
];

export const instance_Subtract_Fail: IMatrixMathInstanceTestData[] = [
  {
    description: 'Should FAIL with 1x2 - 2x2',
    self: new Matrix(1, 2),
    param: new Matrix(2, 2),
    errorMessage: "[Subtraction Error] Matrices must have the same dimensions"
  },
  {
    description: 'Should FAIL with 1x2 - 1x1',
    self: new Matrix(1, 2),
    param: new Matrix(1, 1),
    errorMessage: "[Subtraction Error] Matrices must have the same dimensions"
  },
  {
    description: 'Should FAIL with 10x8 - 8x10',
    self: new Matrix(5, 4),
    param: new Matrix(4, 5),
    errorMessage: "[Subtraction Error] Matrices must have the same dimensions"
  }
];