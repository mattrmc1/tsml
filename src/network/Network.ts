import { Matrix } from "../math/matrix/Matrix";
import { calculateDeltas, cost, sigmoid } from '../math/formulas';
import { NetworkConfig } from "../@types/NetworkConfig";
import { NetworkTraining } from "../@types/NetworkTraining";
import { INetwork } from "../interfaces/INetwork";
import { parseInput } from "../util/parseInput";
import { parseOutput } from "../util/parseOutput";

const chalk = require('chalk');

const defaultConfig: NetworkConfig = {
  layerSizes: [3, 3],
  maxIterations: 10000,
  learningRate: 0.1,
  errorThreshold: 0.001
}

export class NeuralNetwork implements INetwork {

  //#region Member Variables

  private outputKeys: string[] = [];

  private config: NetworkConfig;
  private sizes: number[];

  private activations: Matrix[] = [];
  private weights: Matrix[] = [];
  private biases: Matrix[] = [];

  constructor (config: NetworkConfig = {}) {

    this.config = { ...defaultConfig, ...config }

    this.sizes = [
      this.config.inputSize,
      ...this.config.layerSizes,
      this.config.outputSize
    ];
  }

  //#endregion

  public DEBUG = (debugData?: 'input' | 'output' | 'activations' | 'weights' | 'biases'): void => {
    switch (debugData) {
      
      case 'input':
        this.activations[0].print("white")
        break;

      case 'output':
        this.activations[this.activations.length - 1].print("red");
        break;

      case 'activations':
        this.activations.forEach(a => a.print("red"));
        break;

      case 'weights':
        this.weights.forEach(m => m.print("cyan"));
        break;

      case 'biases':
        this.biases.forEach(b => b.print("magenta"));
        break;

      default:
        this.activations.forEach(a => a.print("red"));
        this.weights.forEach(m => m.print("cyan"));
        this.biases.forEach(b => b.print("magenta"));
    }
  }

  //#region Private Methods

  private validateRun = ( input: number[] ): void => {
    // Verification:
    // Activations should be initialized
    //   • If input size isn't specified, use this inputArray
    //   • If layer sizes aren't specified, use the default
    //   • If output size isn't specified, throw error

    if (input.length !== this.sizes[0]) {
      console.log(chalk.red("Input array must match inputSize from config"));
      throw new Error("whoops");
    }
  }

  private validateTrain = ( input: NetworkTraining[] ): void => {
    // Verification:
    //   • If output size isn't specified, use training data
  }

  private feedForward = ( inputArray: number[] ): number[] => {
    const input: Matrix = Matrix.BuildFromArray(inputArray);
    this.activations[0] = input;

    for (let i = 0; i < this.weights.length; i++) {
      
      const zL = Matrix
        .DotProduct(this.weights[i], this.activations[i])
        .add(this.biases[i])

      this.activations[i + 1] = Matrix.Map(zL, sigmoid);
    }

    return Matrix.FlattenToArray(this.activations[this.activations.length - 1]);
  }

  private backPropagate = (output: number[]): number => {
    // Convert expected output to Matrix (y)
    const expected: Matrix = Matrix.BuildFromArray(output);
      
    // Calculate all deltaWeights
    const { deltaWeights, deltaBiases, costError } = calculateDeltas(
      this.activations,
      this.weights,
      this.biases,
      expected
    );

    // Update weights by learning rate
    this.weights = this.weights.map((m, i) => Matrix.Subtract(m, deltaWeights[i].map(x => x * this.config.learningRate)));

    // Update biases by learning rate
    this.biases = this.biases.map((m, i) => Matrix.Subtract(m, deltaBiases[i].map(x => x * this.config.learningRate)));

    return Matrix.Summation(costError);
  }

  //#endregion

  //#region Public Methods

  public initialize = (): void => {

    if (!this.sizes || !this.sizes.length) throw new Error("Sizes are required to be set prior to initialization");

    for(let i = 0; i < this.sizes.length; i++) {

      const rows = this.sizes[i];
      this.activations.push(new Matrix(rows, 1))

      if (i === 0) continue;

      const cols = this.sizes[i - 1];
      this.weights.push(new Matrix(rows, cols).randomize());
      this.biases.push(new Matrix(rows, 1).randomize());
    }
  }

  public run = (input: number[]): number[] => {
    this.validateRun(input);
    return this.feedForward(input);
  }

  public runAsync = async (input: number[]): Promise<number[]> => new Promise((resolve, reject) => {
    try {
      resolve(this.run(input));
    } catch (e) {
      reject(e);
    }
  })

  public train = (training: NetworkTraining[]): number | void => {

    this.validateTrain(training);

    let totalCost: number = 0;
    let iteration: number = 0;

    while (iteration < this.config.maxIterations) {
      let sum = 0;

      training.forEach(({ input, output }) => {
        this.run(input);
        let err = this.backPropagate(output);
        sum = sum + err;
      });

      totalCost = sum / training.length;

      if (totalCost < this.config.errorThreshold)
        break;
      else
        iteration++;
    }

    return totalCost;
  }

  public trainAsync = (data: NetworkTraining[]): Promise<number | void> => new Promise((resolve, reject) => {
    try {
      resolve(this.train(data));
    } catch (e) {
      reject(e);
    }
  })

  public trainWithObject = (
    training: Array<{
      input: Record<string, number>,
      output: Record<string, number>
    }>
  ): number | void => {

    const parsed: NetworkTraining[] = training.map(({ input, output }) => {
      let parsedInput = parseInput(input);
      let parsedOutput = parseOutput(output);

      this.outputKeys = parsedOutput.keys;

      return { input: parsedInput.values, output: parsedOutput.values }
    });

    return this.train(parsed);
  }

  public runWithObject = (input: Record<string, number>): Record<string,number> => {

    const outputArr = this.feedForward(parseInput(input).values);
    const record: Record<string,number> = {};
    this.outputKeys.forEach((key, index) => {
      record[key] = outputArr[index];
    })
    return record;
  }

  //#endregion
}