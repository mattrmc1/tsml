import { Validate } from "./validations";

const chalk = require('chalk');
const { table } = require('table');

export class Matrix {

  public rows: number;
  public cols: number;
  public data: number[][];

  public constructor(rows: number, columns: number) {

    this.rows = rows;
    this.cols = columns;

    this.data = [];
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for(let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }

    return this;
  }

  // #region Static Methods

  /**
   * Builds a Matrix from an Array
   * 
   * Columns = 1  |  Rows = Array.Length 
   */
  static BuildFromArray = (arr: number[]): Matrix => {

    Validate.BuildFromArray(arr);

    const m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }

    return m;
  }

  /**
   * Flatten matrix to single dimensional array
   * 
   * Starts at the top left m[0][0]
   * 
   * Steps left -> right & top -> bottom
   */
  static FlattenToArray = (m: Matrix): number[] => {

    Validate.FlattenToArray(m);

    const arr: number[] = [];
    m.forEach(x => arr.push(x))
    return arr;
  }

  /**
   * "Multiplies" two matrices and returns a new matrix of the dot product
   * @param left Left side of the Dot Product
   * @param right Right side of the Dot Product
   * @returns Product of the Dot Product
   */
  static DotProduct = (left: Matrix, right: Matrix): Matrix => {

    Validate.DotProduct(left, right);

    // This feel wildly inefficient...
    const product = new Matrix(left.rows, right.cols)
    for (let i = 0; i < product.rows; i++) {
      for (let j = 0; j < product.cols; j++) {
        let sum = 0;
        for (let k = 0; k < left.cols; k++) {
          sum += left.data[i][k] * right.data[k][j];
        }
        product.data[i][j] = sum;
      }
    }
    return product;
  }

  /**
   * Adds Matrix[n] to Matrix[m] and returns Matrix[m]
   * @param m Matrix to be mutated
   * @param n Matrix to be added
   */
  static Add = (m: Matrix, n: Matrix): Matrix => {
    
    Validate.Add(m,n);

    let result = new Matrix(m.rows, m.cols);

    for (let i = 0; i < result.rows; i++) {
      for(let j = 0; j < result.cols; j++) {
        result.data[i][j] = m.data[i][j] + n.data[i][j];
      }
    }

    return result;
  }

  static Subtract = (m: Matrix, n: Matrix): Matrix => {
    
    Validate.Subtract(m,n);

    let result = new Matrix(m.rows, m.cols);

    for (let i = 0; i < m.rows; i++) {
      for(let j = 0; j < m.cols; j++) {
        result.data[i][j] = m.data[i][j] - n.data[i][j];
      }
    }

    return result;
  }

  /**
   * Rotate matrix clockwise by 90deg
   * @param m 
   */
  static Transpose = (m: Matrix): Matrix => {

    const result = new Matrix(m.cols, m.rows);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        result.data[j][i] = m.data[i][j];
      }
    }
    return result;
  }

  static Map = (m: Matrix, func: (x: number) => number): Matrix => {
    
    // Validate

    let result = new Matrix(m.rows, m.cols);

    for (let i = 0; i < result.rows; i++) {
      for(let j = 0; j < result.cols; j++) {
        result.data[i][j] = func(m.data[i][j]);
      }
    }

    return result;
  }

  // #endregion

  // #region Public Methods

  public add = (input: Matrix | number): Matrix => {

    if (typeof input == "number") {
      return this.map(x => x + input);
    }

    Validate.Add(this, input)

    for (let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        this.data[i][j] + input.data[i][j];
      }
    }

    return this;
    
  }

  // TODO Simplifying for prettier logs | Revert for accuracy
  public randomize = (): Matrix => this.map(() => parseFloat(Math.random().toFixed(6)));
  // public randomize = (): Matrix => this.map(Math.random);

  /**
   * Iterate through every element Left -> Right & Top -> Bottom
   * 
   * Note: Matrix values will NOT change
   * @param func Iterated function
   */
  public forEach = (func: (n: number) => any): Matrix => {

    for (let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        func(this.data[i][j]);
      }
    }

    return this;
  }

  /**
   * Map through every element Left -> Right & Top -> Bottom
   * 
   * Note: Matrix values WILL change
   * @param func Mapping function
   */
  public map = (func: (n: number) => number): Matrix => {

    for (let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j]);
      }
    }

    return this;
  }

  // DEBUG
  public print = (color: string = "green"): Matrix => {
    console.log(chalk[color](table(this.data)));
    return this;
  }

  //#endregion
}