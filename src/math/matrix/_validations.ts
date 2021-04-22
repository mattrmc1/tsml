import { Matrix } from "./Matrix";

enum MatrixStaticValidation {
  BuildFromData = 'BuildFromData',
  BuildFromArray = 'BuildFromArray',
  FlattenToArray = 'FlattenToArray',
  DotProduct = 'DotProduct',
  HadamardProduct = 'HadamardProduct',
  Add = 'Add',
  Subtract = 'Subtract',
  Transpose = 'Transpose',
  Map = 'Map'
};

const isIdenticalDimensions = (m: Matrix, n: Matrix): boolean => m.rows === n.rows && m.cols === n.cols;

export const Validate: Record<MatrixStaticValidation, (...args) => void> = {

  BuildFromData: (data: number[][]) => {
    // TODO
  },

  BuildFromArray: (arr: number[]) => {
    if (!Array.isArray(arr)) {
      throw new Error('[BuildFromArray] Invalid array argument');
    }
    if (!arr.length) {
      throw new Error('[BuildFromArray] Array must not be empty')
    }
    arr.forEach(n => {
      if (Array.isArray(n)) {
        throw new Error('[BuildFromArray] Array must be 1-dimensional');
      }
      if (typeof n != "number") {
        throw new Error('[BuildFromArray] Elements in array must be numbers');
      }
    })
  },

  FlattenToArray: (matrix: Matrix) => {
    if (!matrix) {
      throw new Error('[FlattenToArray] Undefined argument');
    }
    if (matrix.cols > 1) {
      throw new Error('[FlattenToArray] Matrix cannot be flattened if it has multiple columns')
    }
  },

  DotProduct: (left: Matrix, right: Matrix) => {
    if (left.cols !== right.rows) {
      throw new Error('[Dot Product Error] Mismatched rows and colums');
    }
  },

  HadamardProduct: (left: Matrix, right: Matrix) => {
    if (!isIdenticalDimensions(left, right)) {
      throw new Error("[Hadamard Product Error] Matrices but have identical dimensions");
    }
  },

  Add: (left: Matrix, right: Matrix) => {
    if (!isIdenticalDimensions(left, right)) {
      throw new Error('[Addition Error] Matrices must have the same dimensions');
    }
  },

  Subtract: (left: Matrix, right: Matrix) => {
    if (!isIdenticalDimensions(left, right)) {
      throw new Error('[Subtraction Error] Matrices must have the same dimensions');
    }
  },

  Transpose: (matrix: Matrix) => {
    if (matrix === undefined) {
      throw new Error('[Transpose Error] Matrix must have at least 1 row and 1 column');
    }
    if (!matrix || !matrix.rows || !matrix.cols) {
      throw new Error('[Transpose Error] Matrix must have at least 1 row and 1 column');
    }
  },

  Map: (m: Matrix, func: (x: number) => number) => {

  },
}