import { Matrix } from "../Matrix";

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

export interface IMatrixBuildFromArrayTestData {
  description: string;
  input: number[];
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