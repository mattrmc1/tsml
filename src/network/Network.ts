import { Matrix } from '../math/matrix/Matrix';
import { calculateDeltas, sigmoid } from '../math/formulas';
import { NetworkConfig } from '../@types/NetworkConfig';
import { INetwork } from './INetwork';
import { TrainingExample } from '../@types/NetworkTraining';
import { Converter } from '../util/convert';
import { NetworkData } from '../@types/NetworkData';

export class NeuralNetwork implements INetwork {
  //#region Variables

  private _inputKeys: string[] = [];
  public get inputKeys(): string[] {
    return this._inputKeys;
  }

  private _outputKeys: string[] = [];
  public get outputKeys(): string[] {
    return this._outputKeys;
  }

  private _config: NetworkConfig;
  public get config(): NetworkConfig {
    return this._config;
  }

  private _sizes: number[];
  public get sizes(): number[] {
    return this._sizes;
  }

  private _activations: Matrix[] = [];
  public get activations(): Matrix[] {
    return this._activations;
  }

  private _weights: Matrix[] = [];
  public get weights(): Matrix[] {
    return this._weights;
  }

  private _biases: Matrix[] = [];
  public get biases(): Matrix[] {
    return this._biases;
  }

  public static DEFAULT_CONFIG: NetworkConfig = {
    layerSizes: [3, 3],
    maxIterations: 10000,
    learningRate: 0.1,
    errorThreshold: 0.001,
  };

  //#endregion

  constructor(config: NetworkConfig = {}) {
    this._config = { ...NeuralNetwork.DEFAULT_CONFIG, ...config };

    this._sizes = [this._config.inputSize, ...this._config.layerSizes, this._config.outputSize];
  }

  //#region Validation

  private validateInitialization = () => {
    if (!this._sizes || !this._sizes.length) throw new Error('[Initialization] Invalid activation layers');

    if (this._sizes.length < 3)
      throw new Error("[Initialization] Hidden layers are required but couldn't be found in config");

    this._sizes.forEach(layer => {
      if (!layer || layer < 1) throw new Error('[Initialization] Neural network cannot have empty activation layers');
    });

    if (!this.config.maxIterations || this.config.maxIterations < 1)
      throw new Error('[Initialization] Invalid max iterations in config');

    if (!this.config.learningRate || this.config.learningRate <= 0 || this.config.learningRate >= 1)
      throw new Error('[Initialization] Learning rate in config must be a number between 0 and 1');

    if (!this.config.errorThreshold || this.config.errorThreshold <= 0 || this.config.errorThreshold >= 1)
      throw new Error('[Initialization] Error threshold in config must be a number between 0 and 1');
  };

  private validateLoad = (weights: Matrix[], biases: Matrix[]): void => {
    for (let i = 1; i < this._sizes.length; i++) {
      const rows = this._sizes[i];
      const cols = this._sizes[i - 1];

      const weight = weights[i - 1];
      const bias = biases[i - 1];

      if (weight.rows !== rows || weight.cols !== cols) throw new Error('nah dude');

      if (bias.rows !== rows || bias.cols !== 1) throw new Error('nah son');
    }
  };

  private validateRun = (): void => {
    if (
      !this.activations ||
      !this.activations.length ||
      !this.weights ||
      !this.weights.length ||
      !this.biases ||
      !this.biases.length
    ) {
      throw new Error(
        '[Run] Invalid or empty layers found. This is likely due to the neural network not being initialized'
      );
    }
  };

  private validateSimpleRun = (input: number[]): void => {
    this.validateRun();

    if (this._inputKeys.length) throw new Error("[Run] This network wasn't trained to handle this type of input");

    if (!input.length) throw new Error('Input array cannot be empty');

    if (input.length !== this._sizes[0])
      throw new Error(
        `The input array length (${input.length}) must match network's expected input size (${this._sizes[0]})`
      );
  };

  private validateComplexRun = (input: Record<string, number>): void => {
    this.validateRun();

    if (!this._inputKeys || !this._inputKeys.length || !this._outputKeys || !this._outputKeys.length) {
      throw new Error("[Run] This network wasn't trained to handle this type of input");
    }

    const parsedInput = Converter.Input(input);

    if (JSON.stringify(parsedInput.keys) !== JSON.stringify(this._inputKeys))
      throw new Error('[Run] The input keys do not match the network keys this network was trained with');

    if (!parsedInput.values.length) throw new Error('[Run] Input array cannot be empty');

    if (parsedInput.values.length !== this._sizes[0])
      throw new Error(
        `[Run] The input array length (${parsedInput.values.length}) must match network's expected input size (${this._config.inputSize})`
      );
  };

  private validateTrain = (training: TrainingExample[]): void => {
    // Validate Initializations
    if (
      !this.activations ||
      !this.activations.length ||
      !this.weights ||
      !this.weights.length ||
      !this.biases ||
      !this.biases.length
    ) {
      throw new Error(
        '[Training] Invalid or empty layers found. This is likely due to the neural network not being initialized'
      );
    }

    // Validate training data exists
    if (!training || !training.length) {
      throw new Error('[Training] Training data cannot be null, undefined, or empty');
    }
  };

  private validateSimpleTrain = (training: TrainingExample[]): { input: number[]; output: number[] }[] => {
    training.forEach(({ input, output }) => {
      if (!Array.isArray(input) || !Array.isArray(output))
        throw new Error('[Training] Input and Output types must match');

      if (!input.length) throw new Error('[Training] Input cannot be empty');

      if (!output.length) throw new Error('[Training] Output cannot be empty');

      if (input.length !== this._config.inputSize)
        throw new Error(
          `[Training] The input array length (${input.length}) did not match the network's expected input size (${this._config.inputSize})`
        );

      if (output.length !== this._config.outputSize)
        throw new Error(
          `[Training] The output array length (${output.length}) did not match the network's expected output size (${this._config.outputSize})`
        );

      const p: (n: number) => boolean = n => typeof n !== 'number' || n < 0 || n > 1;
      if (input.some(p) || output.some(p)) throw new Error('[Training] Input/Output values must be between 0 and 1');
    });

    return training as { input: number[]; output: number[] }[];
  };

  private validateComplexTrain = (
    training: TrainingExample[]
  ): { input: Record<string, number>; output: Record<string, number> }[] => {
    training.forEach(({ input, output }) => {
      if (Array.isArray(input) || Array.isArray(output))
        throw new Error('[Training] Input and Output types must match');
    });

    return training as { input: Record<string, number>; output: Record<string, number> }[];
  };

  //#endregion

  //#region Private

  private reset = () => {
    this._inputKeys = [];
    this._outputKeys = [];
    this._activations = [];
    this._weights = [];
    this._biases = [];
  };

  private trainSimple = (training: { input: number[]; output: number[] }[]): number | void => {
    let totalCost: number = 0;
    let iteration: number = 0;

    while (iteration < this._config.maxIterations) {
      let sum = 0;

      training.forEach(({ input, output }) => {
        this.feedForward(input);
        let err = this.backPropagate(output);
        sum = sum + err;
      });

      totalCost = sum / training.length;

      if (totalCost < this._config.errorThreshold) break;
      else iteration++;
    }

    return totalCost;
  };

  private feedForward = (inputArray: number[]): number[] => {
    const input: Matrix = Matrix.BuildFromArray(inputArray);
    this._activations[0] = input;

    for (let i = 0; i < this._weights.length; i++) {
      const zL = Matrix.DotProduct(this._weights[i], this._activations[i]).add(this._biases[i]);

      this._activations[i + 1] = Matrix.Map(zL, sigmoid);
    }

    return Matrix.FlattenToArray(this._activations[this._activations.length - 1]);
  };

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
    this._weights = this._weights.map((m, i) =>
      Matrix.Subtract(
        m,
        deltaWeights[i].map(x => x * this._config.learningRate)
      )
    );

    // Update biases by learning rate
    this._biases = this._biases.map((m, i) =>
      Matrix.Subtract(
        m,
        deltaBiases[i].map(x => x * this._config.learningRate)
      )
    );

    return Matrix.Summation(costError);
  };

  //#endregion

  //#region Public Methods

  public initialize = (): NeuralNetwork => {
    this.validateInitialization();
    this.reset();

    for (let i = 0; i < this._sizes.length; i++) {
      const rows = this._sizes[i];
      this._activations.push(new Matrix(rows, 1));

      if (i === 0) continue;

      const cols = this._sizes[i - 1];
      this._weights.push(new Matrix(rows, cols).randomize());
      this._biases.push(new Matrix(rows, 1).randomize());
    }

    return this;
  };

  save = (): NetworkData => ({
    weights: this._weights.map(m => m.data),
    biases: this._biases.map(m => m.data),
  });

  load = (data: NetworkData): NeuralNetwork => {
    const weights: Matrix[] = data.weights ? data.weights.map(w => Matrix.BuildFromData(w)) : [...this._weights];

    const biases: Matrix[] = data.biases ? data.biases.map(b => Matrix.BuildFromData(b)) : [...this._biases];

    this.validateLoad(weights, biases);

    this._weights = weights;
    this._biases = biases;

    return this;
  };

  public train = (training: TrainingExample[]): number | void => {
    this.validateTrain(training);

    // Handle number[] i/o
    if (Array.isArray(training[0].input)) {
      return this.trainSimple(this.validateSimpleTrain(training));
    }

    // Handle Record<string, number> i/o
    if (typeof training[0].input === 'object') {
      const { inputKeys, outputKeys, simplified } = Converter.Training(this.validateComplexTrain(training));
      this._inputKeys = inputKeys;
      this._outputKeys = outputKeys;

      return this.trainSimple(this.validateSimpleTrain(simplified));
    }
  };

  public trainAsync = (training: TrainingExample[]): Promise<number | void> =>
    new Promise((resolve, reject) => {
      try {
        resolve(this.train(training));
      } catch (e) {
        reject(e);
      }
    });

  public run = (input: number[] | Record<string, number>): any => {
    // Handle number[] i/o
    if (Array.isArray(input)) {
      this.validateSimpleRun(input);
      return this.feedForward(input);
    }

    // Handle Record<string, number> i/o
    if (typeof input === 'object') {
      this.validateComplexRun(input as Record<string, number>);

      const parsed: number[] = Converter.Input(input).values;

      const outputArray: number[] = this.feedForward(parsed);
      const record: Record<string, number> = {};
      this._outputKeys.forEach((key, index) => (record[key] = outputArray[index]));

      return record;
    }

    throw new Error('Invalid Input Layer');
  };

  public runAsync = async (input: number[] | Record<string, number>): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        resolve(this.run(input));
      } catch (e) {
        reject(e);
      }
    });

  //#endregion
}
