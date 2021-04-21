import { NetworkConfig } from "../../../@types/NetworkConfig";
import { TrainingComplex, TrainingSimple } from "../../../@types/NetworkTraining";
import { NeuralNetwork } from "../../../network/Network";
import { invalid, organized, simple, testConfig, unorganized } from "../data/training.data";

describe("Network Train (Passing)", () => {

  const network = new NeuralNetwork(testConfig);

  beforeEach(() => network.initialize());

  test(
    "Given Network is initialized, " + 
    "When Network is trained (simple), " +
    "Then the weights and biases are updated", () => {

      // Arrange
      const formerWeightSample: number[][] = network.weights[0].data;
      const formerBiasSample: number[][] = network.biases[0].data;

      // Act
      network.train(simple);

      // Assert
      expect(formerWeightSample).toBeDefined();
      expect(formerBiasSample).toBeDefined();
      expect(network.weights[0].data).not.toStrictEqual(formerWeightSample);
      expect(network.biases[0].data).not.toStrictEqual(formerBiasSample);
    })

  test(
    "Given Network is initialized, " + 
    "When Network is trained (organized), " +
    "Then the weights and biases are updated", () => {

      // Arrange
      const formerWeightSample: number[][] = network.weights[0].data;
      const formerBiasSample: number[][] = network.biases[0].data;

      // Act
      network.train(organized);

      // Assert
      expect(formerWeightSample).toBeDefined();
      expect(formerBiasSample).toBeDefined();
      expect(network.weights[0].data).not.toStrictEqual(formerWeightSample);
      expect(network.biases[0].data).not.toStrictEqual(formerBiasSample);
    })

  test(
    "Given Network is initialized, " + 
    "When Network is trained (unorganized), " +
    "Then the weights and biases are updated", () => {

      // Arrange
      const formerWeightSample: number[][] = network.weights[0].data;
      const formerBiasSample: number[][] = network.biases[0].data;

      // Act
      network.train(unorganized);

      // Assert
      expect(formerWeightSample).toBeDefined();
      expect(formerBiasSample).toBeDefined();
      expect(network.weights[0].data).not.toStrictEqual(formerWeightSample);
      expect(network.biases[0].data).not.toStrictEqual(formerBiasSample);
    })

  test(
    "Given Network is initialized, " + 
    "When Network is trained (organized), " +
    "Then the input and output keys are sorted and stored correctly", () => {

      // Arrange
      const formerInputKeys: string[] = [ ...network.inputKeys ];
      const formerOutputKeys: string[] = [ ...network.outputKeys ];

      // Act
      network.train(organized);

      // Assert
      expect(formerInputKeys).toEqual([]);
      expect(formerOutputKeys).toEqual([]);
      expect(network.inputKeys).toEqual([ 'a', 'b', 'c', 'd' ]);
      expect(network.outputKeys).toEqual([ 'answer1', 'answer2' ]);
    })

  test(
    "Given Network is initialized, " + 
    "When Network is trained (unorganized), " +
    "Then the input and output keys are sorted and stored correctly", () => {

      // Arrange
      const formerInputKeys: string[] = [ ...network.inputKeys ];
      const formerOutputKeys: string[] = [ ...network.outputKeys ];

      // Act
      network.train(unorganized);

      // Assert
      expect(formerInputKeys).toEqual([]);
      expect(formerOutputKeys).toEqual([]);
      expect(network.inputKeys).toEqual([ 'a', 'b', 'c', 'd' ]);
      expect(network.outputKeys).toEqual([ 'answer1', 'answer2' ]);
    })

  test(
    "Given Network is initialized with a reasonable errorThreshold, " + 
    "When Network is trained, " +
    "Then the training cost should reach under the errorThreshold", () => {

      // Arrange
      const config: NetworkConfig = {
        ...testConfig,
        maxIterations: 1000000000,
        errorThreshold: 0.05
      };
      const networks: NeuralNetwork[] = [
        new NeuralNetwork(config).initialize(),
        new NeuralNetwork(config).initialize(),
        new NeuralNetwork(config).initialize()
      ];
      const trainings: (TrainingSimple[] | TrainingComplex[])[] = [ simple, organized, unorganized ];

      // Act
      const costs: (number | void)[] = networks.map((n, i) => n.train(trainings[i]));

      // Assert
      costs.forEach(cost => {
        expect(cost).toBeDefined();
        expect(cost).toBeLessThan(config.errorThreshold);
      });

    })

  test(
    "Given Network is initialized with an unreasonable errorThreshold, " + 
    "When Network is trained, " +
    "Then the maxIterations should allow the training to still complete", () => {

      // Arrange
      const config: NetworkConfig = {
        ...testConfig,
        maxIterations: 100,
        errorThreshold: 0.0000001
      };
      const networks: NeuralNetwork[] = [
        new NeuralNetwork(config).initialize(),
        new NeuralNetwork(config).initialize(),
        new NeuralNetwork(config).initialize()
      ];
      const trainings: (TrainingSimple[] | TrainingComplex[])[] = [ simple, organized, unorganized ];

      // Act
      const costs: (number | void)[] = networks.map((n, i) => n.train(trainings[i]));

      // Assert
      costs.forEach(cost => {
        expect(cost).toBeDefined();
        expect(cost).toBeGreaterThan(config.errorThreshold);
      });
    })
})

describe("Network Train (Failing)", () => {

  const network = new NeuralNetwork(testConfig);

  beforeEach(() => network.initialize());

  invalid.forEach(({ description, message, data }) => {
    test(description, () => {
      expect(() => network.train(data)).toThrowError(message);
    })
  })

  test(
    "Given Network is NOT initialized, " + 
    "When Network is trained, " +
    "Then an error is thrown", () => {

      // Arrange
      const networks: NeuralNetwork[] = [
        new NeuralNetwork(testConfig),
        new NeuralNetwork(testConfig),
        new NeuralNetwork(testConfig)
      ];
      const trainings: (TrainingSimple[] | TrainingComplex[])[] = [ simple, organized, unorganized ];
      const message = "[Training] Invalid or empty layers found. This is likely due to the neural network not being initialized";

      // Act
      // Assert
      networks.forEach((n, i) => expect(() => n.train(trainings[i])).toThrowError(message));
    })
})