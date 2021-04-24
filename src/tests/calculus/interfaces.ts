import { Matrix } from "../../math/matrix/Matrix";

export interface DeltaMatrixTestData {
  input: Matrix;
  output: Matrix;
  hidden: Matrix[];
  weights: Matrix[];
  biases: Matrix[];
  y: Matrix;
}

export interface DeltaArrayTestData {
  input: number[];
  output: number[];
  hidden: number[][];
  weights: number[][][];
  biases: number[][];
  y: number[];
}

export interface CostTestData {
  description: string;
  input: {
    actual: Matrix;
    expected: Matrix;
  };
  output: Matrix;
};

export interface SqueezeFunctionTestData {
  description: string;
  input: number;
  expected: number;
}