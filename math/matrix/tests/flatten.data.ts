import { Matrix } from "../Matrix";
import { IMatrixFlattenToArrayTestData, } from "./_interfaces";

export const FlattenToArray_Pass: IMatrixFlattenToArrayTestData[] = [
  {
    description: 'Should PASS 3x1 Matrix',
    input: new Matrix(3, 1).map(x => 4),
    expected: [4,4,4]
  }
];

export const FlattenToArray_Fail: IMatrixFlattenToArrayTestData[] = [
  {
    description: 'Should FAIL 1x3 Matrix',
    input: new Matrix(1, 3).map(x => 4),
    errorMessage: '[FlattenToArray] Matrix cannot be flattened if it has multiple columns'
  }
];