import { IMatrixBuildFromArrayTestData } from "../interfaces";

export const BuildFromArray_Pass: IMatrixBuildFromArrayTestData[] = [
  {
    description: "Should PASS with single item array",
    input: [1],
    expected: [ [1] ]
  },
  {
    description: "Should PASS with multi item array",
    input: [1,2,3],
    expected: [
      [1],
      [2],
      [3]
    ]
  }
];

export const BuildFromArray_Fail: IMatrixBuildFromArrayTestData[] = [
  {
    description: "Should FAIL with empty array",
    input: [],
    errorMessage: "[BuildFromArray] Array must not be empty"
  },
  {
    description: "Should FAIL with empty array",
    input: "bogus",
    errorMessage: "[BuildFromArray] Invalid array argument"
  },
  {
    description: "Should FAIL with an array containing other than numbers",
    input: [ 1,2,3,'a','b','c' ],
    errorMessage: "[BuildFromArray] Elements in array must be numbers"
  },
  {
    description: "Should FAIL with a 2D array",
    input: [ [1,2,3], [4,5,6] ],
    errorMessage: "[BuildFromArray] Array must be 1-dimensional"
  }
];