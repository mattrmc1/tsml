import { Matrix } from "../math/matrix/Matrix";
import { calculateDeltas, sigmoid } from '../math/formulas';
import { NetworkConfig } from "../@types/NetworkConfig";
import { INetwork } from "../interfaces/INetwork";
import { TrainingComplex, TrainingSimple } from "../@types/NetworkTraining";
import { InputLayerComplex, InputLayerSimple, OutputLayerComplex, OutputLayerSimple } from "../@types/NetworkIO";
import { Converter } from "../util/convert";

const chalk = require('chalk');

export class NeuralNetwork implements INetwork {

  //#region Member Variables

  private outputKeys: string[] = [];

  private config: NetworkConfig;
  private sizes: number[];

  private activations: Matrix[] = [];
  private weights: Matrix[] = [];
  private biases: Matrix[] = [];

  public static DEFAULT_CONFIG: NetworkConfig = {
    layerSizes: [3, 3],
    maxIterations: 10000,
    learningRate: 0.1,
    errorThreshold: 0.001
  }

  //#endregion

  // TODO Break out input and output sizes from config object
  constructor (config: NetworkConfig = {}) {

    this.config = { ...NeuralNetwork.DEFAULT_CONFIG, ...config }

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

  //#region Validation

  private validateInitialization = () => {
    if (!this.sizes || !this.sizes.length) {
      throw new Error("Sizes are required to be set prior to initialization");
    }
  }

  private validateRun = (): void => {
    
    // TODO
    // Check member variables have been initiated correctly

    // Verification:
    // Activations should be initialized
    //   • If input size isn't specified, use this inputArray
    //   • If layer sizes aren't specified, use the default
    //   • If output size isn't specified, throw error
  }

  private validateSimpleRun = (input: InputLayerSimple): void => {

    this.validateRun();

    if (!input.length) {
      throw new Error("Input array cannot be empty");
    }

    if (input.length !== this.sizes[0]) {
      throw new Error(`The input arrray length (${input.length}) must match network's expected input size (${this.sizes[0]})`);
    }

  }

  private validateComplexRun = (input: InputLayerComplex): void => {

    // TODO
    // Ensure we have output keys (we were trained with complex in mind...)
    // Verify we're [string]: number
    // && Object.keys(input).length
  }

  private validateTrain = (training: TrainingSimple[] | TrainingComplex[]): void => {
    if (!training || !training.length) {
      throw new Error("Invalid training data received");
    }
  }

  private validateSimpleTrain = ( training: TrainingSimple[] ): void => {
    // Ensure all inputs and outputs are arrays of numbers between 0 and 1
    // Ensure all input and output arrays are the same length respectively
  }

  private validateComplexTrain = ( training: TrainingComplex[] ): void => {
    // Verification:
    //   • If output size isn't specified, use training data
  }

  //#endregion

  //#region Private

  private reset = () => {
    this.activations = [];
    this.weights = [];
    this.biases = [];
  }

  private trainSimple = (training: TrainingSimple[]): number | void => {

    this.validateSimpleTrain(training);

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

    this.validateInitialization();
    this.reset();

    for(let i = 0; i < this.sizes.length; i++) {

      const rows = this.sizes[i];
      this.activations.push(new Matrix(rows, 1))

      if (i === 0) continue;

      const cols = this.sizes[i - 1];
      this.weights.push(new Matrix(rows, cols).randomize());
      this.biases.push(new Matrix(rows, 1).randomize());
    }
  }

  public run = (input: InputLayerSimple | InputLayerComplex): OutputLayerSimple | OutputLayerComplex => {

    // (Handle simple)
    if (Array.isArray(input))
    {
      this.validateSimpleRun(input);
      return this.feedForward(input);
    }

    // (Handle complex)
    if (typeof(input) === 'object')
    {
      this.validateComplexRun(input as InputLayerComplex);

      const parsed: number[] = Converter.Input(input).values;
      this.validateSimpleRun(parsed);

      const outputArray: number[] = this.feedForward(parsed);
      const record: Record<string,number> = {};
      this.outputKeys.forEach((key, index) => {
        record[key] = outputArray[index];
      })
      return record;
    }

    throw new Error("Invalid Input Layer");
  }

  public runAsync = async (input: InputLayerSimple | InputLayerComplex): Promise<OutputLayerSimple | OutputLayerComplex> => new Promise((resolve, reject) => {
    try {
      resolve(this.run(input));
    } catch (e) {
      reject(e);
    }
  })

  public train = (training: TrainingSimple[] | TrainingComplex[]): number | void => {

    this.validateTrain(training);

    // Handle Simple
    if (Array.isArray(training[0].input)) return this.trainSimple(training as TrainingSimple[]);

    // Handle Complex
    if (!Array.isArray(training[0].input) && typeof(training[0].input) === 'object')
    {
      this.validateComplexTrain(training as TrainingComplex[]);
      const { keys, simplified } = Converter.Training(training as TrainingComplex[]);
      this.outputKeys = keys;
      return this.trainSimple(simplified);
    }
  }

  public trainAsync = (training: TrainingSimple[] | TrainingComplex[]): Promise<number | void> => new Promise((resolve, reject) => {
    try {
      resolve(this.train(training));
    } catch (e) {
      reject(e);
    }
  })

  //#endregion
}