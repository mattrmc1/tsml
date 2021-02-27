import { Matrix } from "../Matrix";

interface IStaticAdditionTestData {
  description: string;
  m: Matrix;
  n: Matrix;
  expected?: number[][];
  errorMessage?: string;
}

interface IMatrixInstanceAdditionTestData {
  description: string;
  self: Matrix;
  param: Matrix | number;
  expected?: number[][];
}

export const staticAdditionPass: IStaticAdditionTestData[] = [
  {
    description: 'Addition: Should pass with two 2x2 matrices',
    m: new Matrix(2, 2).map(x => 1),
    n: new Matrix(2, 2).map(x => 100),
    expected: new Matrix(2, 2).map(x => 101).data
  },
  {
    description: 'Addition: Should pass with two 1x1 matrices',
    m: new Matrix(1, 1).map(x => -1),
    n: new Matrix(1, 1).map(x => -1),
    expected: new Matrix(1, 1).map(x => -2).data
  },
  {
    description: 'Addition: Should pass with two 10x8 matrices',
    m: new Matrix(10, 8).map(x => 5),
    n: new Matrix(10, 8).map(x => 95),
    expected: new Matrix(10, 8).map(x => 100).data
  }
];

export const staticAdditionFail: IStaticAdditionTestData[] = [
  {
    description: 'Addition: Should FAIL with 1x2 + 2x2',
    m: new Matrix(1, 2),
    n: new Matrix(2, 2),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  },
  {
    description: 'Addition: Should FAIL with 1x2 + 1x1',
    m: new Matrix(1, 2),
    n: new Matrix(1, 1),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  },
  {
    description: 'Addition: Should FAIL with 10x8 + 8x10',
    m: new Matrix(5, 4),
    n: new Matrix(4, 5),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  }
]