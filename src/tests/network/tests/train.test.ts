import { NetworkConfig } from "../../../@types/NetworkConfig";
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
    "Given Network is initialized targeting a reasonable errorThreshold, " + 
    "When Network is trained, " +
    "Then the training cost should reach under the errorThreshold", () => {

      // Arrange
      const config: NetworkConfig = {
        maxIterations: 1000000000,
        errorThreshold: 0.05,
        ...testConfig
      };
      const networkSimple = new NeuralNetwork(config).initialize();
      const networkOrganized = new NeuralNetwork(config).initialize();
      const networkUnorganized = new NeuralNetwork(config).initialize();

      // Act
      const simpleCost = networkSimple.train(simple);
      const organizedCost = networkOrganized.train(organized);
      const unorganizedCost = networkUnorganized.train(unorganized);

      // Assert
      expect(simpleCost).toBeDefined();
      expect(organizedCost).toBeDefined();
      expect(unorganizedCost).toBeDefined();

      expect(simpleCost).toBeLessThan(config.errorThreshold);
      expect(organizedCost).toBeLessThan(config.errorThreshold);
      expect(unorganizedCost).toBeLessThan(config.errorThreshold);

    })

  test(
    "Given Network is initialized targeting an unreasonable errorThreshold, " + 
    "When Network is trained, " +
    "Then the maxIterations should allow the training to stil complete", () => {

      // Arrange
      const config: NetworkConfig = {
        maxIterations: 100,
        errorThreshold: 0.0000001,
        ...testConfig
      };
      const networkSimple = new NeuralNetwork(config).initialize();
      const networkOrganized = new NeuralNetwork(config).initialize();
      const networkUnorganized = new NeuralNetwork(config).initialize();

      let isTakingTooLong = false;
      const timeoutId = setTimeout(() => {
        isTakingTooLong = true;
      }, 5000);

      // Act
      const simpleCost = networkSimple.train(simple);
      const organizedCost = networkOrganized.train(organized);
      const unorganizedCost = networkUnorganized.train(unorganized);

      // Assert
      expect(isTakingTooLong).toBe(false);
      clearTimeout(timeoutId);

      expect(simpleCost).toBeDefined();
      expect(organizedCost).toBeDefined();
      expect(unorganizedCost).toBeDefined();

      expect(simpleCost).toBeGreaterThan(config.errorThreshold);
      expect(organizedCost).toBeGreaterThan(config.errorThreshold);
      expect(unorganizedCost).toBeGreaterThan(config.errorThreshold);
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
      const networkSimple = new NeuralNetwork(testConfig);
      const networkOrganized = new NeuralNetwork(testConfig);
      const networkUnorganized = new NeuralNetwork(testConfig);

      // Act
      // Assert
      expect(() => networkSimple.train(simple)).toThrowError("[Training] Invalid or empty layers found. This is likely due to the neural network not being initialized");
      expect(() => networkOrganized.train(organized)).toThrowError("[Training] Invalid or empty layers found. This is likely due to the neural network not being initialized");
      expect(() => networkUnorganized.train(unorganized)).toThrowError("[Training] Invalid or empty layers found. This is likely due to the neural network not being initialized");
    })
})