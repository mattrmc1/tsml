import { Matrix } from "../math/matrix/Matrix";
import { calculateDeltas, sigmoid } from '../math/formulas';
import { NetworkConfig } from "../@types/NetworkConfig";
import { NetworkTraining } from "../@types/NetworkTraining";
import { INetwork } from "../interfaces/INetwork";

const chalk = require('chalk');

const defaultConfig: NetworkConfig = {
  layerSizes: [3, 3],
  iterations: 2000
}

export class NeuralNetwork implements INetwork {

  //#region Member Variables
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

  private verifyRun = ( input: number[] ): void => {
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

  private verifyTrain = ( input: NetworkTraining[] ): void => {
    // Verification:
    //   • If output size isn't specified, use training data
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

  public run = (inputArray: number[]): number[] => {

    this.verifyRun(inputArray)

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

  public train = (tests: NetworkTraining[], learningRate: number = 0.1): void => {

    const iterations: number = 10000;

    for (let i = 0; i < iterations; i++) {
      tests.forEach(({ input, output }) => {

        this.verifyTrain(tests);

        this.run(input);
  
        // Convert expected output to Matrix (y)
        const expected: Matrix = Matrix.BuildFromArray(output);
  
        // Calculate all deltaWeights
        const { deltaWeights, deltaBiases } = calculateDeltas(
          this.activations,
          this.weights,
          this.biases,
          expected
        );
  
        // Update weights by learning rate
        this.weights = this.weights.map((m, i) => Matrix.Subtract(m, deltaWeights[i].map(x => x * learningRate)));
  
        // Update biases by learning rate
        this.biases = this.biases.map((m, i) => Matrix.Subtract(m, deltaBiases[i].map(x => x * learningRate)));
      })
    }

  }

  public trainAsync(data: NetworkTraining[]): Promise<number | void> {
    throw new Error("Method not implemented.");
  }

  //#endregion
}