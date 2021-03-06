import IMatrix from "../../interfaces/IMatrix";
import { MatrixStatic } from "./MatrixStatic";
import { Validate } from "./_validations";

const chalk = require('chalk');
const { table } = require('table');

export class Matrix extends MatrixStatic implements IMatrix {

  public rows: number;
  public cols: number;
  public data: number[][];

  public constructor(rows: number, columns: number) {
    super();

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

  public add = (input: number | IMatrix): IMatrix => {
    if (typeof input === "number") {
      return this.map(x => x + input);
    }

    Validate.Add(this, input)

    for (let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        this.data[i][j] = this.data[i][j] + input.data[i][j];
      }
    }

    return this;
  }

  public substract = (input: number | IMatrix): IMatrix => {

    if (typeof input === "number") {
      return this.map(x => x - input);
    }

    Validate.Subtract(this, input);

    for (let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        this.data[i][j] = this.data[i][j] - input.data[i][j];
      }
    }

    return this;
  }

  public multiply = (input: number | IMatrix): IMatrix => {
    if (typeof input === "number") {
      return this.map(x => x * input);
    }

    Validate.DotProduct(this, input);
    // This feel wildly inefficient...
    const product = new Matrix(this.rows, input.cols)
    for (let i = 0; i < product.rows; i++) {
      for (let j = 0; j < product.cols; j++) {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[i][k] * input.data[k][j];
        }
        product.data[i][j] = sum;
      }
    }

    this.rows = product.rows;
    this.cols = product.cols;
    this.data = product.data;
  }

  public forEach = (func: (n: number) => any): IMatrix => {
    for (let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        func(this.data[i][j]);
      }
    }

    return this;
  }

  public map = (func: (n: number) => number): IMatrix => {
    for (let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j]);
      }
    }

    return this;
  }

  // // TODO Simplifying for prettier logs | Revert for accuracy
  public randomize = (): IMatrix => this.map(() => parseFloat(Math.random().toFixed(6)));

  public print = (color: string = "green"): IMatrix => {
    console.log(chalk[color](table(this.data)));
    return this;
  }
}