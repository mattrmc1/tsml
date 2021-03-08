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

  public randomize = (): IMatrix => this.map(() => Math.random());

  public print = (color: string = "green"): IMatrix => {
    console.log(chalk[color](table(this.data)));
    return this;
  }
}