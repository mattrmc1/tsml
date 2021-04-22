import { Matrix } from "../../math/matrix/Matrix";

export interface IMatrixMathStaticTestData {
  description: string;
  left: Matrix;
  right: Matrix;
  expected?: number[][];
  errorMessage?: string;
}

export interface IMatrixMathInstanceTestData {
  description: string;
  self: Matrix;
  param: Matrix | number;
  expected?: number[][];
  errorMessage?: string;
}

export interface IMatrixBuildFromDataTestData {
  description: string;
  data: number[][];
  rows?: number;
  cols?: number;
  errorMessage?: string;
}

export interface IMatrixBuildFromArrayTestData {
  description: string;
  input: any;
  expected?: number[][];
  errorMessage?: string;
}

export interface IMatrixFlattenToArrayTestData {
  description: string;
  input: Matrix;
  expected?: number[];
  errorMessage?: string;
}

export interface IMatrixLoopTestData {
  description: string;
  input: Matrix;
  func: (m: number) => number;
  expected?: Matrix;
  errorMessage?: string;
}

export interface IMatrixTransposeTestData {
  description: string;
  input: Matrix;
  expected?: Matrix;
  errorMessage?: string;
}

export interface IMarixSummationTestData {
  description: string;
  input: Matrix;
  expected?: number;
  errorMessage?: string;
}