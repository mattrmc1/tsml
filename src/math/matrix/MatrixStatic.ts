import { Matrix } from "./Matrix";
import { Validate } from "./_validations";

export class MatrixStatic {
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

  static BuildIdentity = (size: number): Matrix => {
    const matrix = new Matrix(size, size);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        matrix.data[i][j] = i === j ? 1 : 0;
      }
    }
    return matrix;
  }

  /**
   * Multiplies two matrices and returns a new matrix of the dot product
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
  
  static HadamardProduct = (left: Matrix, right: Matrix): Matrix => {

    Validate.HadamardProduct(left, right);

    const product = new Matrix(left.rows, left.cols);
    for (let i = 0; i < product.rows; i++) {
      for (let j = 0; j < product.cols; j++) {
        product.data[i][j] = left.data[i][j] * right.data[i][j];
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

    Validate.Transpose(m);

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
}