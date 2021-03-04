import { Matrix } from "../math/matrix/Matrix";
import { calculateDeltas, cost, sigmoid } from "../math/formulas";

const chalk = require('chalk');

export type NetworkConfig = {
  inputSize?: number; // Can be set on train call
  outputSize?: number; // Can be set on train call
  layerSizes?: number[]; // A little confusing... length of array is how many layers, each number is size of layer
  iterations?: number;
}

export type NetworkTraining = {
  input: number[];
  output: number[];
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

  /**
   * Expects Sizes to have been set
   * 
   * • Populates activation matrices based on input, output, and layer sizes
   * 
   * • Populates weights matrices and randomizes values
   * 
   * • Populates biases matrices and randomizes values
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

  // #region Feed Forward

  private verifyFeedForwardInput = (input: number[]): void => {
    if (input.length !== this.sizes[0]) {
      console.log(chalk.red("Input array must match inputSize from config"));
      throw new Error("whoops");
    }
  }

  public run = (inputArray: number[]): number[] => {

    this.verifyFeedForwardInput(inputArray);

    const input: Matrix = Matrix.BuildFromArray(inputArray);
    this.activations[0] = input;

    for (let i = 0; i < this.weights.length; i++) {
      
      // z(L) = w(L) * a(L-1) + b(L);
      let activationLayer = Matrix
        .DotProduct(this.weights[i], this.activations[i])
        .add(this.biases[i])

      // a(L) = sigmoid(z(L))
      this.activations[i + 1] = activationLayer.map(sigmoid);
    }

    // Output will be last activation layer
    return Matrix.FlattenToArray(this.activations[this.activations.length - 1]);
  }

  // #endregion

  // #region Back Propagation

  private verifyTrainingInput = (input: NetworkTraining[]): void => {
    // TODO
  }

  private doTestExample = (tests: NetworkTraining[], learningRate = 0.1) => {
    tests.forEach(({ input, output }) => {

      // Run test and grab output
      this.run(input);
      const actual: Matrix = this.activations[this.activations.length - 1];

      // Convert expected output to Matrix (y)
      const expected: Matrix = Matrix.BuildFromArray(output);

      // Calculate error (actual <-> expected)
      const err: Matrix = cost(actual, expected);

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

  public train = (tests: NetworkTraining[], learningRate: number = 0.1): void => {

    // Init
    this.verifyTrainingInput(tests);

    // Do the thing
    for (let i = 0; i < 10000; i++) {
      this.doTestExample(tests, learningRate);
    }

  }

  // #endregion
}