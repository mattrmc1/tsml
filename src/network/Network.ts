import { Matrix } from "../math/matrix/Matrix";
import { calculateDeltas, sigmoid } from '../math/formulas';
import { NetworkConfig } from "../@types/NetworkConfig";
import { INetwork } from "../interfaces/INetwork";
import { TrainingComplex, TrainingSimple } from "../@types/NetworkTraining";
import { InputLayerComplex, InputLayerSimple, OutputLayerComplex, OutputLayerSimple } from "../@types/NetworkIO";
import { Converter } from "../util/convert";

const chalk = require('chalk');

export class NeuralNetwork implements INetwork {

  //#region Variables

  private _inputKeys: string[] = [];
  private _outputKeys: string[] = [];

  private _config: NetworkConfig;
  public get config(): NetworkConfig { return this._config; }

  private _sizes: number[];
  public get sizes(): number[] { return this._sizes; }

  private _activations: Matrix[] = [];
  public get activations(): Matrix[] { return this._activations; }

  private _weights: Matrix[] = [];
  public get weights(): Matrix[] { return this._weights; }

  private _biases: Matrix[] = [];
  public get biases(): Matrix[] { return this._biases; }

  public static DEFAULT_CONFIG: NetworkConfig = {
    layerSizes: [3, 3],
    maxIterations: 10000,
    learningRate: 0.1,
    errorThreshold: 0.001
  }

  //#endregion

  // TODO Break out input and output sizes from config object
  constructor (config: NetworkConfig = {}) {

    this._config = { ...NeuralNetwork.DEFAULT_CONFIG, ...config }

    this._sizes = [
      this._config.inputSize,
      ...this._config.layerSizes,
      this._config.outputSize
    ];
  }

  public DEBUG = (debugData?: 'input' | 'output' | 'activations' | 'weights' | 'biases'): void => {
    switch (debugData) {
      
      case 'input':
        this._activations[0].print("white")
        break;

      case 'output':
        this._activations[this._activations.length - 1].print("red");
        break;

      case 'activations':
        this._activations.forEach(a => a.print("red"));
        break;

      case 'weights':
        this._weights.forEach(m => m.print("cyan"));
        break;

      case 'biases':
        this._biases.forEach(b => b.print("magenta"));
        break;

      default:
        this._activations.forEach(a => a.print("red"));
        this._weights.forEach(m => m.print("cyan"));
        this._biases.forEach(b => b.print("magenta"));
    }
  }

  //#region Validation

  private validateInitialization = () => {
    if (!this._sizes || !this._sizes.length)
      throw new Error("[Initialization] Invalid activation layers");
    
    if (this._sizes.length < 3)
      throw new Error("[Initialization] Hidden layers are required but couldn't be found in config");
    
    this._sizes.forEach(layer => {
      if (!layer || layer < 1)
        throw new Error("[Initialization] Neural network cannot have empty activation layers");
    })

    if (!this.config.maxIterations || this.config.maxIterations < 1)
      throw new Error("[Initialization] Invalid max iterations in config");

    if (!this.config.learningRate || this.config.learningRate <= 0 || this.config.learningRate >= 1)
      throw new Error("[Initialization] Learning rate in config must be a number between 0 and 1");

    if (!this.config.errorThreshold || this.config.errorThreshold <= 0 || this.config.errorThreshold >= 1)
      throw new Error("[Initialization] Error threshold in config must be a number between 0 and 1");
  }

  private validateRun = (): void => {
    if (
      !this.activations
      || !this.activations.length
      || !this.weights
      || !this.weights.length
      || !this.biases
      || !this.biases.length
    ) {
      throw new Error("[Run] Invalid or empty layers found. This is likely due to the neural network not being initialized");
    }
  }
    

  private validateSimpleRun = (input: InputLayerSimple): void => {

    this.validateRun();

    if (!input.length)
      throw new Error("Input array cannot be empty");

    if (input.length !== this._sizes[0])
      throw new Error(`The input array length (${input.length}) must match network's expected input size (${this._sizes[0]})`);
  }

  private validateComplexRun = (input: InputLayerComplex): void => {

    this.validateRun();

    if (
      !this._inputKeys
      || !this._inputKeys.length
      || !this._outputKeys
      || !this._outputKeys.length
    ) {
      throw new Error("[Run] This network wasn't trained to handle this type of input");
    }

    const parsedInput = Converter.Input(input);
    if (JSON.stringify(parsedInput.keys) !== JSON.stringify(this._inputKeys))
      throw new Error('[Run] The input keys do not match the network keys this network was trained with');
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
    this._activations = [];
    this._weights = [];
    this._biases = [];
  }

  private trainSimple = (training: TrainingSimple[]): number | void => {

    this.validateSimpleTrain(training);

    let totalCost: number = 0;
    let iteration: number = 0;

    while (iteration < this._config.maxIterations) {
      let sum = 0;

      training.forEach(({ input, output }) => {
        this.run(input);
        let err = this.backPropagate(output);
        sum = sum + err;
      });

      totalCost = sum / training.length;

      if (totalCost < this._config.errorThreshold)
        break;
      else
        iteration++;
    }

    return totalCost;
  }

  private feedForward = ( inputArray: number[] ): number[] => {
    const input: Matrix = Matrix.BuildFromArray(inputArray);
    this._activations[0] = input;

    for (let i = 0; i < this._weights.length; i++) {
      
      const zL = Matrix
        .DotProduct(this._weights[i], this._activations[i])
        .add(this._biases[i])

      this._activations[i + 1] = Matrix.Map(zL, sigmoid);
    }

    return Matrix.FlattenToArray(this._activations[this._activations.length - 1]);
  }

  private backPropagate = (output: number[]): number => {
    // Convert expected output to Matrix (y)
    const expected: Matrix = Matrix.BuildFromArray(output);
      
    // Calculate all deltaWeights
    const { deltaWeights, deltaBiases, costError } = calculateDeltas(
      this._activations,
      this._weights,
      this._biases,
      expected
    );

    // Update weights by learning rate
    this._weights = this._weights.map((m, i) => Matrix.Subtract(m, deltaWeights[i].map(x => x * this._config.learningRate)));

    // Update biases by learning rate
    this._biases = this._biases.map((m, i) => Matrix.Subtract(m, deltaBiases[i].map(x => x * this._config.learningRate)));

    return Matrix.Summation(costError);
  }

  //#endregion

  //#region Public Methods

  public initialize = (): NeuralNetwork => {

    this.validateInitialization();
    this.reset();

    for(let i = 0; i < this._sizes.length; i++) {

      const rows = this._sizes[i];
      this._activations.push(new Matrix(rows, 1))

      if (i === 0) continue;

      const cols = this._sizes[i - 1];
      this._weights.push(new Matrix(rows, cols).randomize());
      this._biases.push(new Matrix(rows, 1).randomize());
    }

    return this;
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
      this._outputKeys.forEach((key, index) => {
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
      const { inputKeys, outputKeys, simplified } = Converter.Training(training as TrainingComplex[]);
      this._inputKeys = inputKeys
      this._outputKeys = outputKeys;
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