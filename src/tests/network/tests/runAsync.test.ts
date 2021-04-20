import { OutputLayerComplex, OutputLayerSimple } from "../../../@types/NetworkIO";
import { NeuralNetwork } from "../../../network/Network";
import { organized, simple, testConfig, unorganized } from "../data/training.data";

describe("Network Run Async (Passing)", () => {

  const network = new NeuralNetwork(testConfig);

  beforeEach(() => network.initialize())

  test(
    "Given Network initialized and trained (simple), " + 
    "When Network is run (simple), " +
    "Then an output layer array is returned", async () => {

      // Arrange
      network.train(simple);

      // Act
      const actual: OutputLayerSimple = await network.runAsync(simple[0].input) as OutputLayerSimple;

      // Assert
      expect(Array.isArray(actual)).toBeTruthy();
      expect(actual.length).toEqual(network.config.outputSize);
      for(let i = 0; i < actual.length; i++) {
        expect(actual[i]).toBeCloseTo(simple[0].output[i], 1.3);
      }
    })
  
  test(
    "Given Network initialized and trained (complex/organized), " + 
    "When Network is run (complex/organized), " +
    "Then a mapped output object is returned", async () => {

      // Arrange
      network.train(organized);

      // Act
      const actual: OutputLayerComplex = await network.runAsync(organized[0].input) as OutputLayerComplex;

      // Assert
      expect(Array.isArray(actual)).toBeFalsy();
      expect(Object.keys(actual)).toContain("answer1");
      expect(Object.keys(actual)).toContain("answer2");

      expect(actual.answer1).toBeCloseTo(organized[0].output.answer1, 1.3);
      expect(actual.answer2).toBeCloseTo(organized[0].output.answer2, 1.3);
    })

  test(
    "Given Network initialized and trained (complex/unorganized), " + 
    "When Network is run (complex/unorganized), " +
    "Then a mapped output object is returned", async () => {

      // Arrange
      network.train(unorganized);

      // Act
      const actual: OutputLayerComplex = await network.runAsync(unorganized[0].input) as OutputLayerComplex;

      // Assert
      expect(Array.isArray(actual)).toBeFalsy();
      expect(Object.keys(actual)).toContain("answer1");
      expect(Object.keys(actual)).toContain("answer2");

      expect(actual.answer1).toBeCloseTo(unorganized[0].output.answer1, 1.3);
      expect(actual.answer2).toBeCloseTo(unorganized[0].output.answer2, 1.3);
    })
})

describe("Network Run Async (Failing)", () => {

  test(
    "Given Network was NOT initialized, " + 
    "When Network is run (simple or complex), " +
    "Then an error occurs", async () => {

      // Arrange
      const network1 = new NeuralNetwork(testConfig);
      const network2 = new NeuralNetwork(testConfig);
      const expected = "[Run] Invalid or empty layers found. This is likely due to the neural network not being initialized";

      // Act
      // Assert
      try {
        await network1.runAsync(simple[0].input)
      } catch (e)
      {
        expect(e.message).toStrictEqual(expected)
      }

      try {
        await network2.runAsync(organized[0].input)
      } catch (e)
      {
        expect(e.message).toStrictEqual(expected)
      }

    })

  test(
    "Given Network was initialized and trained (simple or complex), " + 
    "When Network is run (simple or complex) with invalid input layer, " +
    "Then an error occurs", async () => {

      // Arrange
      const network1 = new NeuralNetwork(testConfig).initialize();
      network1.train(simple);
      const expected1 = "The input array length (3) must match network's expected input size (4)";

      const network2 = new NeuralNetwork(testConfig).initialize();
      network2.train(unorganized);
      const expected2 = "[Run] The input keys do not match the network keys this network was trained with";

      // Act
      // Assert
      try {
        await network1.runAsync([1,0,0])
      } catch (e)
      {
        expect(e.message).toStrictEqual(expected1)
      }
      
      try {
        await network2.runAsync({w: 0, x: 1, y: 0, z: 0})
      } catch (e)
      {
        expect(e.message).toStrictEqual(expected2)
      }
    })
  
  test(
    "Given Network was trained (simple), " + 
    "When Network is run (complex), " +
    "Then an error occurs", async () => {

      // Arrange
      const network = new NeuralNetwork(testConfig).initialize();
      network.train(simple);

      // Act
      // Assert
      try {
        await network.runAsync({a: 0, b: 1, c: 0, d: 0})
      } catch (e)
      {
        expect(e.message).toStrictEqual("[Run] This network wasn't trained to handle this type of input")
      }
    })

  test(
    "Given Network was trained (complex), " + 
    "When Network is run (simple), " +
    "Then an error occurs", async () => {

      // Arrange
      const network = new NeuralNetwork(testConfig).initialize();
      network.train(organized);

      // Act
      // Assert
      try {
        await network.runAsync([1, 0, 0, 0])
      } catch (e)
      {
        expect(e.message).toStrictEqual("[Run] This network wasn't trained to handle this type of input")
      }
    })
})