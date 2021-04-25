import { Matrix } from "../../../math/matrix/Matrix";
import { IMarixSummationTestData } from "../interfaces";

export const Summation_Pass: IMarixSummationTestData[] = [
  {
    description: 'Should PASS with 2x2 matrix',
    input: new Matrix(2, 2).map(x => 1),
    expected: 2 * 2 * 1
  },
  {
    description: 'Should PASS with 10x8 matrix',
    input: new Matrix(10, 8).map(x => 5),
    expected: 10 * 8 * 5
  },
  {
    description: 'Should PASS empty matrix',
    input: new Matrix(0, 0),
    expected: 0
  }
];

export const Summation_Fail: IMarixSummationTestData[] = [];