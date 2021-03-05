import { Matrix } from "../Matrix";
import { IMatrixMathInstanceTestData, IMatrixMathStaticTestData } from "./_interfaces";

export const static_Add_Pass: IMatrixMathStaticTestData[] = [
  {
    description: 'Should PASS with two 2x2 matrices',
    left: new Matrix(2, 2).map(x => 1),
    right: new Matrix(2, 2).map(x => 100),
    expected: new Matrix(2, 2).map(x => 101).data
  },
  {
    description: '(Swapped) Should PASS with two 2x2 matrices',
    right: new Matrix(2, 2).map(x => 1),
    left: new Matrix(2, 2).map(x => 100),
    expected: new Matrix(2, 2).map(x => 101).data
  },
  {
    description: 'Should PASS with two 1x1 matrices',
    left: new Matrix(1, 1).map(x => -1),
    right: new Matrix(1, 1).map(x => -1),
    expected: new Matrix(1, 1).map(x => -2).data
  },
  {
    description: '(Swapped) Should PASS with two 1x1 matrices',
    right: new Matrix(1, 1).map(x => -1),
    left: new Matrix(1, 1).map(x => -1),
    expected: new Matrix(1, 1).map(x => -2).data
  },
  {
    description: 'Should PASS with two 10x8 matrices',
    left: new Matrix(10, 8).map(x => 5),
    right: new Matrix(10, 8).map(x => 95),
    expected: new Matrix(10, 8).map(x => 100).data
  },
  {
    description: '(Swapped) Should PASS with two 10x8 matrices',
    right: new Matrix(10, 8).map(x => 5),
    left: new Matrix(10, 8).map(x => 95),
    expected: new Matrix(10, 8).map(x => 100).data
  }
];

export const static_Add_Fail: IMatrixMathStaticTestData[] = [
  {
    description: 'Should FAIL with 1x2 + 2x2',
    left: new Matrix(1, 2),
    right: new Matrix(2, 2),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  },
  {
    description: 'Should FAIL with 1x2 + 1x1',
    left: new Matrix(1, 2),
    right: new Matrix(1, 1),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  },
  {
    description: 'Should FAIL with 10x8 + 8x10',
    left: new Matrix(5, 4),
    right: new Matrix(4, 5),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  }
];

export const instance_Add_Pass: IMatrixMathInstanceTestData[] = [
  {
    description: "Should add and mutate instance values (Matrix 2x2)",
    self: new Matrix(2, 2).map(x => 1),
    param: new Matrix(2, 2).map(x => 100),
    expected: new Matrix(2, 2).map(x => 101).data
  },
  {
    description: "Should add and mutate instance values (Matrix 10x8) ",
    self: new Matrix(10, 8).map(x => 5),
    param: new Matrix(10, 8).map(x => 95),
    expected: new Matrix(10, 8).map(x => 100).data
  },
  {
    description: "Should add and mutate instance values (Scalar = 3)",
    self: new Matrix(3, 4).map(x => 1),
    param: 3,
    expected: new Matrix(3, 4).map(x => 4).data
  }
];

export const instance_Add_Fail: IMatrixMathInstanceTestData[] = [
  {
    description: 'Should FAIL with 1x2 + 2x2',
    self: new Matrix(1, 2),
    param: new Matrix(2, 2),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  },
  {
    description: 'Should FAIL with 1x2 + 1x1',
    self: new Matrix(1, 2),
    param: new Matrix(1, 1),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  },
  {
    description: 'Should FAIL with 10x8 + 8x10',
    self: new Matrix(5, 4),
    param: new Matrix(4, 5),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  }
];