import { NetworkConfig } from "../../../@types/NetworkConfig";
import { TrainingExample } from "../../../@types/NetworkTraining";
import { NeuralNetwork } from "../../../network/Network";
import { invalid, organized, simple, testConfig, unorganized } from "../data/training.data";

describe("Network Train Async (Passing)", () => {

  const network = new NeuralNetwork(testConfig);

  beforeEach(() => network.initialize());

  test(
    "Given Network is initialized, " + 
    "When Network is trained (simple), " +
    "Then the weights and biases are updated", async () => {

      // Arrange
      const formerWeightSample: number[][] = network.weights[0].data;
      const formerBiasSample: number[][] = network.biases[0].data;

      // Act
      await network.trainAsync(simple);

      // Assert
      expect(formerWeightSample).toBeDefined();
      expect(formerBiasSample).toBeDefined();
      expect(network.weights[0].data).not.toStrictEqual(formerWeightSample);
      expect(network.biases[0].data).not.toStrictEqual(formerBiasSample);
    })

  test(
    "Given Network is initialized, " + 
    "When Network is trained (organized), " +
    "Then the weights and biases are updated", async () => {

      // Arrange
      const formerWeightSample: number[][] = network.weights[0].data;
      const formerBiasSample: number[][] = network.biases[0].data;

      // Act
      await network.trainAsync(organized);

      // Assert
      expect(formerWeightSample).toBeDefined();
      expect(formerBiasSample).toBeDefined();
      expect(network.weights[0].data).not.toStrictEqual(formerWeightSample);
      expect(network.biases[0].data).not.toStrictEqual(formerBiasSample);
    })

  test(
    "Given Network is initialized, " + 
    "When Network is trained (unorganized), " +
    "Then the weights and biases are updated", async () => {

      // Arrange
      const formerWeightSample: number[][] = network.weights[0].data;
      const formerBiasSample: number[][] = network.biases[0].data;

      // Act
      await network.trainAsync(unorganized);

      // Assert
      expect(formerWeightSample).toBeDefined();
      expect(formerBiasSample).toBeDefined();
      expect(network.weights[0].data).not.toStrictEqual(formerWeightSample);
      expect(network.biases[0].data).not.toStrictEqual(formerBiasSample);
    })

  test(
    "Given Network is initialized, " + 
    "When Network is trained (organized), " +
    "Then the input and output keys are sorted and stored correctly", async () => {

      // Arrange
      const formerInputKeys: string[] = [ ...network.inputKeys ];
      const formerOutputKeys: string[] = [ ...network.outputKeys ];

      // Act
      await network.trainAsync(organized);

      // Assert
      expect(formerInputKeys).toEqual([]);
      expect(formerOutputKeys).toEqual([]);
      expect(network.inputKeys).toEqual([ 'a', 'b', 'c', 'd' ]);
      expect(network.outputKeys).toEqual([ 'answer1', 'answer2' ]);
    })

  test(
    "Given Network is initialized, " + 
    "When Network is trained (unorganized), " +
    "Then the input and output keys are sorted and stored correctly", async () => {

      // Arrange
      const formerInputKeys: string[] = [ ...network.inputKeys ];
      const formerOutputKeys: string[] = [ ...network.outputKeys ];

      // Act
      await network.trainAsync(unorganized);

      // Assert
      expect(formerInputKeys).toEqual([]);
      expect(formerOutputKeys).toEqual([]);
      expect(network.inputKeys).toEqual([ 'a', 'b', 'c', 'd' ]);
      expect(network.outputKeys).toEqual([ 'answer1', 'answer2' ]);
    })

  test(
    "Given Network is initialized targeting a reasonable errorThreshold, " + 
    "When Network is trained, " +
    "Then the training cost should reach under the errorThreshold", async () => {

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
      const trainings: TrainingExample[][] = [ simple, organized, unorganized ];

      // Act
      const costs: (number | void)[] = await Promise.all(networks.map((n, i) => n.trainAsync(trainings[i])));

      // Assert
      costs.forEach(cost => {
        expect(cost).toBeDefined();
        expect(cost).toBeLessThan(config.errorThreshold);
      });
    })

  test(
    "Given Network is initialized targeting an unreasonable errorThreshold, " + 
    "When Network is trained, " +
    "Then the maxIterations should allow the training to stil complete", async () => {

      // Arrange
      const config: NetworkConfig = {
        maxIterations: 100,
        errorThreshold: 0.0000001,
        ...testConfig
      };
      const networks: NeuralNetwork[] = [
        new NeuralNetwork(config).initialize(),
        new NeuralNetwork(config).initialize(),
        new NeuralNetwork(config).initialize()
      ];
      const trainings: TrainingExample[][] = [ simple, organized, unorganized ];

      // Act
      const costs: (number | void)[] = await Promise.all(networks.map((n, i) => n.trainAsync(trainings[i])));

      // Assert
      costs.forEach(cost => {
        expect(cost).toBeDefined();
        expect(cost).toBeGreaterThan(config.errorThreshold);
      });
    })
})

describe("Network Train Async (Failing)", () => {

  const network = new NeuralNetwork(testConfig);

  beforeEach(() => network.initialize());

  invalid.forEach(({ description, message, data }) => {
    test(description, async () => {
      try {
        await network.trainAsync(data);
      } catch (e) {
        expect(e.message).toEqual(message);
      }
    })
  })

  test(
    "Given Network is NOT initialized, " + 
    "When Network is trained, " +
    "Then an error is thrown", async () => {

      // Arrange
      const networks: NeuralNetwork[] = [
        new NeuralNetwork(testConfig),
        new NeuralNetwork(testConfig),
        new NeuralNetwork(testConfig)
      ];
      const trainings: TrainingExample[][] = [ simple, organized, unorganized ];
      const message = "[Training] Invalid or empty layers found. This is likely due to the neural network not being initialized";

      // Act
      // Assert
      networks.forEach(async (n, i) => {
        try {
          await n.trainAsync(trainings[i]);
        } catch (e) {
          expect(e.message).toEqual(message);
        }
      });
    })
})