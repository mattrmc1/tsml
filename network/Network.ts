// Input layer size + values
// Output layer size
// # of hidden layers
// # of neurons per hidden layer

import { Matrix } from "../math/Matrix";
import { sigmoid } from "../math/squishify";

const chalk = require('chalk');

export type NetworkConfig = {
  inputSize?: number; // Can be set on train call
  outputSize?: number; // Can be set on train call
  layerSizes?: number[]; // A little confusing... length of array is how many layers, each number is size of layer
  iterations?: number;
}

const defaultConfig: NetworkConfig = {
  layerSizes: [3, 3],
  iterations: 2000
}

export class NeuralNetwork {

  private config: NetworkConfig;
  private sizes: number[]; // [ inputSize, ...hiddenSizes, outputSize ]

  private activations: Matrix[] = [];
  private weights: Matrix[] = [];
  private biases: Matrix[] = [];

  constructor (config: NetworkConfig = {}) {

    // TODO: Refactor when config is updated
    this.config = { ...defaultConfig, ...config }

    this.sizes = [
      this.config.inputSize,
      ...this.config.layerSizes,
      this.config.outputSize
    ];
  }

  public DEBUG = (): void => {
    this.activations.forEach(a => a.print("red"));
    this.weights.forEach(m => m.print("cyan"));
    this.biases.forEach(b => b.print("magenta"));
  }

  /**
   * Expect Sizes to have been set
   */
  public initialize = (): void => {
    
    if (!this.sizes || !this.sizes.length) throw new Error("nah son");

    for(let i = 0; i < this.sizes.length; i++) {

      const rows = this.sizes[i];
      this.activations.push(new Matrix(rows, 1))

      if (i === 0) continue;

      const cols = this.sizes[i - 1];
      this.weights.push(new Matrix(rows, cols).randomize());
      this.biases.push(new Matrix(rows, 1).randomize());
    }
  }

  public feedForward = (inputArr: number[]): number[] => {

    // TODO Verify Input

    if (inputArr.length !== this.sizes[0]) {
      console.log(chalk.red("Input array must match inputSize from config"));
      throw new Error("whoops");
    }

    const input: Matrix = Matrix.BuildFromArray(inputArr);
    this.activations[0] = input;

    let output: Matrix;

    for(let i = 0; i < this.weights.length; i++) {
      let layer = Matrix
        .DotProduct(this.weights[i], this.activations[i])
        .add(this.biases[i])
        .map(sigmoid);
      
      this.activations[i + 1] = layer;
      output = layer
    }

    return Matrix.FlattenToArray(output);
  }
}