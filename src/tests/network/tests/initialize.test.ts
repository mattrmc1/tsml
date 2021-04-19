import { NetworkConfig } from "../../../@types/NetworkConfig";
import { Matrix } from "../../../math/matrix/Matrix";
import { NeuralNetwork } from "../../../network/Network";

describe("Network Initialization (Passing)", () => {

  test(
    "Given NO config, " + 
    "When creating new network, " +
    "Then network should use default config", () => {
      // Arrange

      // Act
      const network = new NeuralNetwork();

      // Assert
      expect(network.config.layerSizes).toBe(NeuralNetwork.DEFAULT_CONFIG.layerSizes);
      expect(network.config.maxIterations).toBe(NeuralNetwork.DEFAULT_CONFIG.maxIterations);
      expect(network.config.learningRate).toBe(NeuralNetwork.DEFAULT_CONFIG.learningRate);
      expect(network.config.errorThreshold).toBe(NeuralNetwork.DEFAULT_CONFIG.errorThreshold);
    })

  test(
    "Given valid config, " + 
    "When creating new network, " +
    "Then network configured correctly", () => {
      // Arrange
      const config: NetworkConfig = {
        layerSizes: [2, 2],
        maxIterations: 12000,
        learningRate: 0.11,
        errorThreshold: 0.002
      };
  
      // Act
      const network = new NeuralNetwork(config);
  
      // Assert
      expect(network.config.layerSizes).toBe(config.layerSizes);
      expect(network.config.maxIterations).toBe(config.maxIterations);
      expect(network.config.learningRate).toBe(config.learningRate);
      expect(network.config.errorThreshold).toBe(config.errorThreshold);
    })

  test(
    "Given valid sizes, " + 
    "When creating new network, " +
    "Then network sizes are correct", () => {
      // Arrange
      const config: NetworkConfig = {
        inputSize: 4,
        outputSize: 2
      };
      const expected: number[] = [4, 3, 3, 2];
  
      // Act
      const network = new NeuralNetwork(config);
  
      // Assert
      expect(network.sizes).toStrictEqual(expected);
    })

  test(
    "Given valid sizes, " + 
    "When initializing new network, " +
    "Then activation layers have the correct dimensions", () => {
      // Arrange
      const config: NetworkConfig = {
        inputSize: 7,
        outputSize: 2,
        layerSizes: [ 3, 4 ]
      };
      const sizes: number[] = [7, 3, 4, 2];
      const activations = [
        new Matrix(7, 1),
        new Matrix(3, 1),
        new Matrix(4, 1),
        new Matrix(2, 1),
      ]
  
      // Act
      const network = new NeuralNetwork(config);
      network.initialize();
  
      // Assert
      expect(network.sizes).toStrictEqual(sizes);
      expect(JSON.stringify(network.activations)).toBe(JSON.stringify(activations))
    })

  test(
    "Given valid sizes, " + 
    "When initializing new network, " +
    "Then weight layers have the correct dimensions", () => {
      // Arrange
      const config: NetworkConfig = {
        inputSize: 7,
        outputSize: 2,
        layerSizes: [ 3, 4 ]
      };
      const sizes: number[] = [7, 3, 4, 2];
      const weights = [
        new Matrix(3, 7),
        new Matrix(4, 3),
        new Matrix(2, 4)
      ];
  
      // Act
      const network = new NeuralNetwork(config);
      network.initialize();
  
      // Assert
      expect(network.sizes).toStrictEqual(sizes);
      for(let i = 0; i < weights.length; i++) {
        expect(weights[i].rows).toStrictEqual(network.weights[i].rows);
        expect(weights[i].cols).toStrictEqual(network.weights[i].cols);
      }
    })

  test(
    "Given valid sizes, " + 
    "When initializing new network, " +
    "Then bias layers have the correct dimensions", () => {
      // Arrange
      const config: NetworkConfig = {
        inputSize: 7,
        outputSize: 2,
        layerSizes: [ 3, 4 ]
      };
      const sizes: number[] = [7, 3, 4, 2];
      const biases = [
        new Matrix(3, 1),
        new Matrix(4, 1),
        new Matrix(2, 1)
      ];
  
      // Act
      const network = new NeuralNetwork(config);
      network.initialize();
  
      // Assert
      expect(network.sizes).toStrictEqual(sizes);
      for(let i = 0; i < biases.length; i++) {
        expect(biases[i].rows).toStrictEqual(network.biases[i].rows);
        expect(biases[i].cols).toStrictEqual(network.biases[i].cols);
      }
    })

  test(
    "Given network has been initialized, " + 
    "When re-initializing a new network, " +
    "Then the layers' values do NOT persist", () => {
      // Arrange
      const network = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2
      });
      const trainingData = [
        {
          input: [.5, .5, .5],
          output: [1, 0]
        },
        {
          input: [.75, .5, .75],
          output: [0, 1]
        },
      ];
      const runData = [.2,.2,.2];
      network.initialize();
      const weightSample: number = network.weights[0].data[0][0];
      const biasesSample: number = network.biases[0].data[0][0];

      // Act
      network.initialize();
      network.train(trainingData);
      network.run(runData);
  
      // Assert
      expect(network.weights[0].data[0][0]).not.toStrictEqual(weightSample);
      expect(network.biases[0].data[0][0]).not.toStrictEqual(biasesSample);
      expect(() => network.train(trainingData)).not.toThrowError();
      expect(() => network.run(runData)).not.toThrowError();
    })
})

describe("Network Initialization (Failing)", () => {

  test(
    "Given invalid inputSize, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const network = new NeuralNetwork({ inputSize: 3 });

      // Act  
      // Assert
      expect(() => network.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
    })

  test(
    "Given invalid outputSize, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const network = new NeuralNetwork({ outputSize: 3 });

      // Act  
      // Assert
      expect(() => network.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
    })

  test(
    "Given invalid layerSizes, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const network1 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        layerSizes: []
      });
      const network2 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        layerSizes: [0, 1]
      });
      const network3 = new NeuralNetwork();

      // Act  
      // Assert
      expect(() => network1.initialize()).toThrowError("[Initialization] Hidden layers are required but couldn't be found in config");
      expect(() => network2.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
      expect(() => network3.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
    })

  test(
    "Given invalid maxIterations, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const network1 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        maxIterations: undefined
      });
      const network2 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        maxIterations: 0
      });
      const network3 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        maxIterations: -12093
      });

      // Act  
      // Assert
      expect(() => network1.initialize()).toThrowError("[Initialization] Invalid max iterations in config");
      expect(() => network2.initialize()).toThrowError("[Initialization] Invalid max iterations in config");
      expect(() => network3.initialize()).toThrowError("[Initialization] Invalid max iterations in config");
    })

  test(
    "Given invalid learningRate, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const network1 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        learningRate: undefined
      });
      const network2 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        learningRate: 0
      });
      const network3 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        learningRate: -0.3
      });
      const network4 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        learningRate: 1.01
      });

      // Act  
      // Assert
      expect(() => network1.initialize()).toThrowError("[Initialization] Learning rate in config must be a number between 0 and 1");
      expect(() => network2.initialize()).toThrowError("[Initialization] Learning rate in config must be a number between 0 and 1");
      expect(() => network3.initialize()).toThrowError("[Initialization] Learning rate in config must be a number between 0 and 1");
      expect(() => network4.initialize()).toThrowError("[Initialization] Learning rate in config must be a number between 0 and 1");
    })

  test(
    "Given invalid errorThreshold, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const network1 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        errorThreshold: undefined
      });
      const network2 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        errorThreshold: 0
      });
      const network3 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        errorThreshold: -0.3
      });
      const network4 = new NeuralNetwork({
        inputSize: 3,
        outputSize: 2,
        errorThreshold: 1.01
      });

      // Act  
      // Assert
      expect(() => network1.initialize()).toThrowError("[Initialization] Error threshold in config must be a number between 0 and 1");
      expect(() => network2.initialize()).toThrowError("[Initialization] Error threshold in config must be a number between 0 and 1");
      expect(() => network3.initialize()).toThrowError("[Initialization] Error threshold in config must be a number between 0 and 1");
      expect(() => network4.initialize()).toThrowError("[Initialization] Error threshold in config must be a number between 0 and 1");
    })
})