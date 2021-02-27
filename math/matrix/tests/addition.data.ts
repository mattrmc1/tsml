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
    description: 'test pass 1',
    m: new Matrix(2, 2).map(x => 1),
    n: new Matrix(2, 2).map(x => 100),
    expected: new Matrix(2, 2).map(x => 101).data
  },
  {
    description: 'test pass 2',
    m: new Matrix(1, 1).map(x => -1),
    n: new Matrix(1, 1).map(x => -1),
    expected: new Matrix(1, 1).map(x => -2).data
  },
  {
    description: 'test pass 3',
    m: new Matrix(10, 8).map(x => 5),
    n: new Matrix(10, 8).map(x => 95),
    expected: new Matrix(10, 8).map(x => 100).data
  }
];

export const staticAdditionFail: IStaticAdditionTestData[] = [
  {
    description: 'test fail 1',
    m: new Matrix(1, 2).map(x => 1),
    n: new Matrix(2, 2).map(x => 100),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  },
  {
    description: 'test fail 2',
    m: new Matrix(1, 2).map(x => -1),
    n: new Matrix(1, 1).map(x => -1),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  },
  {
    description: 'test fail 3',
    m: new Matrix(10, 8).map(x => 5),
    n: new Matrix(8, 10).map(x => 95),
    errorMessage: "[Addition Error] Matrices must have the same dimensions"
  }
]