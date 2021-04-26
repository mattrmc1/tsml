import { TrainingExample } from "../../../@types/NetworkTraining";
import { NeuralNetwork } from "../../../network/Network";
import { organized, simple, testConfig, unorganized } from "../data/training.data";

describe("Network Run (Passing)", () => {

  const network = new NeuralNetwork(testConfig);

  beforeEach(() => network.initialize())

  test(
    "Given Network initialized and trained (simple), " + 
    "When Network is run (simple), " +
    "Then an output layer array is returned", () => {

      // Arrange
      network.train(simple);

      // Act
      const actual: number[] = network.run(simple[0].input);

      // Assert
      expect(Array.isArray(actual)).toBeTruthy();
      expect(actual.length).toEqual(network.config.outputSize);
      for(let i = 0; i < actual.length; i++) {
        expect(actual[i]).toBeCloseTo(simple[0].output[i], 1); // Results >0.95 will pass
      }
    })
  
  test(
    "Given Network initialized and trained (complex/organized), " + 
    "When Network is run (complex/organized), " +
    "Then a mapped output object is returned", () => {

      // Arrange
      network.train(organized);

      // Act
      const actual: Record<string, number> = network.run(organized[0].input);
      const expected: Record<string, number> = organized[0].output as Record<string, number>;
      const keys = Object.keys(actual);

      // Assert
      expect(Array.isArray(actual)).toBeFalsy();
      expect(keys.length).toEqual(testConfig.outputSize);
      expect(keys).toContain("answer1");
      expect(keys).toContain("answer2");

      expect(actual.answer1).toBeCloseTo(expected.answer1, 1); // Results >0.95 will pass
      expect(actual.answer2).toBeCloseTo(expected.answer2, 1); // Results >0.95 will pass
    })

  test(
    "Given Network initialized and trained (complex/unorganized), " + 
    "When Network is run (complex/unorganized), " +
    "Then a mapped output object is returned", () => {

      // Arrange
      network.train(unorganized);

      // Act
      const actual: Record<string, number> = network.run(unorganized[0].input);
      const expected: Record<string, number> = unorganized[0].output as Record<string, number>;
      const keys = Object.keys(actual);

      // Assert
      expect(Array.isArray(actual)).toBeFalsy();
      expect(keys.length).toEqual(testConfig.outputSize);
      expect(keys).toContain("answer1");
      expect(keys).toContain("answer2");

      expect(actual.answer1).toBeCloseTo(expected.answer1, 1); // Results >0.95 will pass
      expect(actual.answer2).toBeCloseTo(expected.answer2, 1); // Results >0.95 will pass
    })
})

describe("Network Run (Failing)", () => {

  test(
    "Given Network was NOT initialized, " + 
    "When Network is run (simple or complex), " +
    "Then an error occurs", () => {

      // Arrange
      const networks: NeuralNetwork[] = [
        new NeuralNetwork(testConfig),
        new NeuralNetwork(testConfig),
        new NeuralNetwork(testConfig)
      ];
      const inputs: (number[] | Record<string, number>)[] = [
        simple[0].input,
        organized[0].input,
        unorganized[0].input
      ];
      const message: string = "[Run] Invalid or empty layers found. This is likely due to the neural network not being initialized";

      // Act
      // Assert
      networks.forEach((n, i) => expect(() => n.run(inputs[i])).toThrowError(message));

    })

  test(
    "Given Network was initialized and trained (simple), " + 
    "When Network is run (simple) with invalid input layer, " +
    "Then an error occurs", () => {

      // Arrange
      const network = new NeuralNetwork(testConfig).initialize();
      const invalid: number[] = [1, 0, 0];
      const message: string = `The input array length (${invalid.length}) must match network's expected input size (${testConfig.inputSize})`
      network.train(simple);

      // Act
      // Assert
      expect(() => network.run(invalid)).toThrowError(message);

    })

  test(
    "Given Network was initialized and trained (complex), " + 
    "When Network is run (complex) with invalid input layer, " +
    "Then an error occurs", () => {

      // Arrange
      const network = new NeuralNetwork(testConfig).initialize();
      const invalid: Record<string, number> = { w: 0, x: 1, y: 0, z: 0 };
      const message: string = "[Run] The input keys do not match the network keys this network was trained with";
      network.train(unorganized);

      // Act
      // Assert
      expect(() => network.run(invalid)).toThrowError(message);

    })
  
  test(
    "Given Network was trained (simple), " + 
    "When Network is run (complex), " +
    "Then an error occurs", () => {

      // Arrange
      const network = new NeuralNetwork(testConfig).initialize();
      network.train(simple);

      // Act
      // Assert
      expect(() => network.run(organized[0].input)).toThrowError("[Run] This network wasn't trained to handle this type of input");
    })

  test(
    "Given Network was trained (complex), " + 
    "When Network is run (simple), " +
    "Then an error occurs", () => {

      // Arrange
      const networks = [
        new NeuralNetwork(testConfig).initialize(),
        new NeuralNetwork(testConfig).initialize()
      ];
      const training: TrainingExample[][] = [ organized, unorganized ];

      networks.forEach((n, i) => {
        n.train(training[i]);

        // Act
        // Assert
        expect(() => n.run(simple[0].input)).toThrowError("[Run] This network wasn't trained to handle this type of input")
      });
    })
})