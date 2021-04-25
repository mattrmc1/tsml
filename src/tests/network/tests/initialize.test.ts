import { NetworkConfig } from "../../../@types/NetworkConfig";
import { Matrix } from "../../../math/matrix/Matrix";
import { NeuralNetwork } from "../../../network/Network";
import { organized, simple, testConfig } from "../data/training.data";

describe("Network Constructor", () => {

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
})

describe("Network Initialization (Passing)", () => {

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
    "Then the weights and biases are re-initialized", () => {
      // Arrange
      const network = new NeuralNetwork(testConfig).initialize();
      const weightSample: number = network.weights[0].data[0][0];
      const biasesSample: number = network.biases[0].data[0][0];

      // Act
      network.initialize();
  
      // Assert
      expect(network.weights[0].data[0][0]).not.toStrictEqual(weightSample);
      expect(network.biases[0].data[0][0]).not.toStrictEqual(biasesSample);
    })

  test(
    "Given a network has been initialized and re-initialized, " + 
    "When training and running, " +
    "Then network should succeed", () => {
      // Arrange
      // Act
      const network = new NeuralNetwork(testConfig)
        .initialize()
        .initialize();
  
      // Assert
      expect(() => network.train(simple)).not.toThrowError();
      expect(() => network.run(simple[0].input)).not.toThrowError();
    })

  test(
    "Given a network has been initialized and trained (object), " + 
    "When the network is re-initialized, " +
    "Then the input/output keys should be initialized", () => {
      // Arrange
      const network = new NeuralNetwork(testConfig).initialize()
      network.train(organized);
      const inputKeys = [...network.inputKeys];
      const outputKeys = [...network.outputKeys];

      // Act
      network.initialize();
  
      // Assert
      expect(network.inputKeys).not.toStrictEqual(inputKeys);
      expect(network.outputKeys).not.toStrictEqual(outputKeys);
      expect(network.inputKeys.length).toEqual(0);
      expect(network.outputKeys.length).toEqual(0);
    })
})

describe("Network Initialization (Failing)", () => {

  test(
    "Given NO config, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const network = new NeuralNetwork();

      // Act  
      // Assert
      expect(() => network.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
    })

  test(
    "Given invalid inputSize, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const network1 = new NeuralNetwork({ inputSize: 3 });
      const network2 = new NeuralNetwork({ inputSize: 3, outputSize: 0 });

      // Act  
      // Assert
      expect(() => network1.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
      expect(() => network2.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
    })

  test(
    "Given invalid outputSize, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const network1 = new NeuralNetwork({ outputSize: 3 });
      const network2 = new NeuralNetwork({ inputSize: 0, outputSize: 3 });

      // Act  
      // Assert
      expect(() => network1.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
      expect(() => network2.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
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

      // Act  
      // Assert
      expect(() => network1.initialize()).toThrowError("[Initialization] Hidden layers are required but couldn't be found in config");
      expect(() => network2.initialize()).toThrowError("[Initialization] Neural network cannot have empty activation layers");
    })

  test(
    "Given invalid maxIterations, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const networks: NeuralNetwork[] = [
        new NeuralNetwork({ ...testConfig, maxIterations: undefined }),
        new NeuralNetwork({ ...testConfig, maxIterations: 0 }),
        new NeuralNetwork({ ...testConfig, maxIterations: -12093 })
      ];
      const message = "[Initialization] Invalid max iterations in config";

      // Act  
      // Assert
      networks.forEach(n => expect(() => n.initialize()).toThrowError(message));
    })

  test(
    "Given invalid learningRate, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const networks: NeuralNetwork[] = [
        new NeuralNetwork({ ...testConfig, learningRate: undefined }),
        new NeuralNetwork({ ...testConfig, learningRate: 0 }),
        new NeuralNetwork({ ...testConfig, learningRate: -0.3 }),
        new NeuralNetwork({ ...testConfig, learningRate: 1.01 })
      ]
      const message = "[Initialization] Learning rate in config must be a number between 0 and 1";

      // Act  
      // Assert
      networks.forEach(n => expect(() => n.initialize()).toThrowError(message));
    })

  test(
    "Given invalid errorThreshold, " + 
    "When initializing a new network, " +
    "Then an error is thrown", () => {

      // Arrange
      const networks: NeuralNetwork[] = [
        new NeuralNetwork({ ...testConfig, errorThreshold: undefined }),
        new NeuralNetwork({ ...testConfig, errorThreshold: 0 }),
        new NeuralNetwork({ ...testConfig, errorThreshold: -0.3 }),
        new NeuralNetwork({ ...testConfig, errorThreshold: 1.01 }),
      ]
      const message = "[Initialization] Error threshold in config must be a number between 0 and 1";

      // Act  
      // Assert
      networks.forEach(n => expect(() => n.initialize()).toThrowError(message));
    })
})