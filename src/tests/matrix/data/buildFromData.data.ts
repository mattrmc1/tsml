import { IMatrixBuildFromDataTestData } from "../interfaces";

export const BuildFromData_Pass: IMatrixBuildFromDataTestData[] = [
  {
    description: "Should PASS with single item array",
    data: [[1]],
    rows: 1,
    cols: 1
  },
  {
    description: "Should PASS with multi item array",
    data: [
      [1],
      [2],
      [3]
    ],
    rows: 3,
    cols: 1
  },
  {
    description: "Should PASS with multi dimensional array",
    data: [
      [ 1, 2, 3 ],
      [ 1, 2, 3 ]
    ],
    rows: 2,
    cols: 3
  }
];

export const BuildFromData_Fail: IMatrixBuildFromDataTestData[] = [
  {
    description: "Should FAIL with empty array",
    data: [],
    errorMessage: "[BuildFromData] Data was undefined, null, or empty"
  },
  {
    description: "Should FAIL with nested empty array",
    data: [[]],
    errorMessage: "[BuildFromData] Invalid data record"
  },
  {
    description: "Should FAIL with a mismatched 2D array",
    data: [
      [ 1, 2, 3 ],
      [ 1, 2 ],
      [ 1, 2, 3 ]
    ],
    errorMessage: "[BuildFromData] Nested arrays must have equal length because they represent the columns of the matrix"
  }
];