import { IMatrixBuildFromArrayTestData } from "./_interfaces";

export const BuildFromArray_Pass: IMatrixBuildFromArrayTestData[] = [
  {
    description: "Should PASS with single item array",
    input: [1],
    expected: [ [1] ]
  },
  {
    description: "Should PASS with multi item array",
    input: [1,2,3],
    expected: [ [1], [2], [3] ]
  }
];

export const BuildFromArray_Fail: IMatrixBuildFromArrayTestData[] = [
  {
    description: "Should FAIL with empty array",
    input: [],
    errorMessage: "[BuildFromArray] Invalid array argument"
  }
];