import { Matrix } from "./Matrix";

const chalk = require('chalk');
const { table } = require('table');

enum MatrixStaticValidation {
  BuildFromArray = 'BuildFromArray',
  FlattenToArray = 'FlattenToArray',
  DotProduct = 'DotProduct',
  HadamardProduct = 'HadamardProduct',
  Add = 'Add',
  Subtract = 'Subtract',
  Transpose = 'Transpose',
  Map = 'Map'
};

export const Validate: Record<MatrixStaticValidation, (...args) => void> = {

  BuildFromArray: (arr: number[]) => {
    if (!arr || !arr.length) {
      throw new Error('[BuildFromArray] Invalid array argument');
    }

    // TODO Do we really want to restrict inputs at this point?
    // arr.forEach(n => {
    //   if (n < 0 || n > 1) {
    //     throw new Error('[BuildFromArray] Activation in the input layer must be between 0 and 1');
    //   }
    // })
  },

  FlattenToArray: (matrix: Matrix) => {
    if (matrix.cols > 1) {
      // console.log(chalk.yellow("[FlattenToArray] An array with multiple columns was flattened"));
    }
  },

  DotProduct: (left: Matrix, right: Matrix) => {
    if (left.cols !== right.rows) {
      const message: string = "[Dot Product Error] Mismatched rows and colums";
      // console.log(chalk.red(message));
      // console.log(chalk.red(table(left.data)))
      // console.log(chalk.red(table(right.data)))
      throw new Error(message);
    }
  },

  HadamardProduct: (left: Matrix, right: Matrix) => {
    if (left.rows !== right.rows || left.cols !== right.cols) {
      const message: string = "[Hadamard Product Error] Matrices but have identical dimensions"
      throw new Error(message);
    }
  },

  Add: (left: Matrix, right: Matrix) => {
    if (left.rows !== right.rows || left.cols !== right.cols) {
      const message: string = `[Addition Error] Matrices must have the same dimensions`;
      // console.log(chalk.red(message));
      // console.log(chalk.red(table(left.data)))
      // console.log(chalk.red(table(right.data)))
      throw new Error(message);
    }
  },

  Subtract: (left: Matrix, right: Matrix) => {
    if (left.rows !== right.rows || left.cols !== right.cols) {
      const message: string = `[Subtraction Error] Matrices must have the same dimensions`;
      // console.log(chalk.red(message));
      // console.log(chalk.red(table(left.data)))
      // console.log(chalk.red(table(right.data)))
      throw new Error(message);
    }
  },

  Transpose: (matrix: Matrix) => {

  },

  Map: (m: Matrix, func: (x: number) => number) => {

  },
}