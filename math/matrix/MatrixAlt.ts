// TODO Matrix refactor switching rows cols
// I feel like we're eventually gonna want to build them like this...

// Existing:
// [ [1, 2], [3, 4], [5, 6] ]
// ╔═══╤═══╗
// ║ 1 │ 2 ║
// ╟───┼───╢
// ║ 3 │ 4 ║
// ╟───┼───╢
// ║ 5 │ 6 ║
// ╚═══╧═══╝
// ---
// [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]
// ╔═══╤═══╤═══╗
// ║ 1 │ 2 │ 3 ║
// ╟───┼───┼───╢
// ║ 4 │ 5 │ 6 ║
// ╚═══╧═══╧═══╝


// New:
// [ [1, 2], [3, 4], [5, 6] ]
// ╔═══╤═══╤═══╗
// ║ 1 │ 3 │ 5 ║
// ╟───┼───┼───╢
// ║ 2 │ 4 │ 6 ║
// ╚═══╧═══╧═══╝
// ---
// [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]
// ╔═══╤═══╗
// ║ 1 │ 4 ║
// ╟───┼───╢
// ║ 2 │ 5 ║
// ╟───┼───╢
// ║ 3 │ 6 ║
// ╚═══╧═══╝

const chalk = require('chalk');
const { table } = require('table');

export class MatrixAlt {

  public rows: number;
  public cols: number;
  public data: number[][];

  public constructor(rows: number, columns: number) {

    this.rows = rows;
    this.cols = columns;

    this.data = [];
    for (let i = 0; i < this.cols; i++) {
      this.data[i] = [];
      for(let j = 0; j < this.rows; j++) {
        this.data[i][j] = 0;
      }
    }

    return this;
  }

  static BuildFromArray = (arr: number[]): MatrixAlt => {

    const m = new MatrixAlt(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[0][i] = arr[i];
    }

    return m;
  }

  static FlattenToArray = (m: MatrixAlt): number[] => {

    // Validate.FlattenToArray(m);

    const arr: number[] = [];
    m.forEach(x => arr.push(x))
    return arr;
  }

  static Add = (m: MatrixAlt, n: MatrixAlt): MatrixAlt => {
    let result = new MatrixAlt(m.rows, m.cols);

    for (let i = 0; i < result.cols; i++) {
      for(let j = 0; j < result.rows; j++) {
        result.data[i][j] = m.data[i][j] + n.data[i][j];
      }
    }

    return result;
  }

  public forEach = (func: (n: number) => any): MatrixAlt => {

    for (let i = 0; i < this.cols; i++) {
      for(let j = 0; j < this.rows; j++) {
        func(this.data[i][j]);
      }
    }

    return this;
  }

  public map = (func: (n: number) => number): MatrixAlt => {

    for (let i = 0; i < this.cols; i++) {
      for(let j = 0; j < this.rows; j++) {
        this.data[i][j] = func(this.data[i][j]);
      }
    }

    return this;
  }

  // DEBUG
  private parseForCli = (): number[][] => {

    let result: number[][] = [];

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (!result[j]) {
          result[j] = [];
        }
        result[j][i] = this.data[i][j];
      }
    }

    return result
  }
  public print = (color: string = "green"): MatrixAlt => {
    console.log(chalk[color](table(this.parseForCli())));
    return this;
  }
}