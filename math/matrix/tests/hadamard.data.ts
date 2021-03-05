import { Matrix } from "../Matrix";
import { IMatrixMathStaticTestData } from "./_interfaces";

export const HadamardProduct_Pass: IMatrixMathStaticTestData[] = [
  {
    description: 'Should PASS when equal dimensions (2x3) * (2x3)',
    left: new Matrix(2,3).map(x => 3),
    right: new Matrix(2,3).map(x => 4),
    expected: new Matrix(2,3).map(x => 3 * 4).data
  },
];

export const HadamardProduct_Fail: IMatrixMathStaticTestData[] = [
  {
    description: 'Should FAIL when dimensions are NOT identical (1x2) * (3x1)',
    left: new Matrix(1,2).map(x => 3),
    right: new Matrix(3,1).map(x => 4),
    errorMessage: '[Hadamard Product Error] Matrices but have identical dimensions'
  },
];