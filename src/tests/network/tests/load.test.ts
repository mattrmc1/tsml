import { NetworkData } from "../../../@types/NetworkData";
import { Matrix } from "../../../math/matrix/Matrix";
import { NeuralNetwork } from "../../../network/Network"
import { simple, testConfig } from "../data/training.data"

describe("Network Loading (Passing)", () => {

  const parse = (matrices: Matrix[]): string => JSON.stringify(matrices.map(m => m.data));

  test(
    "Given Network initialized, " + 
    "When data is loaded into the Network, " +
    "Then the weights and biases are set correctly", () => {

      // Arrange
      const original = new NeuralNetwork(testConfig).initialize();
      original.train(simple);

      // Act
      const data: NetworkData = original.save();
      const copy = new NeuralNetwork(testConfig)
        .initialize()
        .load(data);

      // Assert
      const originalWeights: string = JSON.stringify(original.weights.map(m => m.data));
      const originalBiases: string = JSON.stringify(original.biases.map(m => m.data));
      const copyWeights: string = JSON.stringify(copy.weights.map(m => m.data));
      const copyBiases: string = JSON.stringify(copy.biases.map(m => m.data));

      expect(originalWeights).toEqual(copyWeights);
      expect(originalBiases).toEqual(copyBiases);
    })

  test(
    "Given Network initialized, " + 
    "When only weight data is loaded into the Network, " +
    "Then the weights are loaded and biases remain initialized", () => {

      // Arrange
      const original = new NeuralNetwork(testConfig).initialize();
      original.train(simple);

      // Act
      const data: NetworkData = original.save();
      const copy = new NeuralNetwork(testConfig).initialize()
      const initializedBiases = copy.biases;
      copy.load({ weights: data.weights });

      // Assert
      expect(parse(copy.weights)).toEqual(parse(original.weights));
      expect(parse(copy.biases)).toEqual(parse(initializedBiases));
    })

  test(
    "Given Network initialized, " + 
    "When only biases data is loaded into the Network, " +
    "Then the weights remain initialized and biases are loaded", () => {

      // Arrange
      const original = new NeuralNetwork(testConfig).initialize();
      original.train(simple);

      // Act
      const data: NetworkData = original.save();
      const copy = new NeuralNetwork(testConfig).initialize()
      const initializedWeights = copy.weights;
      copy.load({ biases: data.biases });

      // Assert
      expect(parse(copy.biases)).toEqual(parse(original.biases));
      expect(parse(copy.weights)).toEqual(parse(initializedWeights));
    })

})

describe("Network Loading (Failing)", () => {

  const original = new NeuralNetwork(testConfig);

  beforeEach(() => original.initialize());

  const parse = (matrices: Matrix[]): string => JSON.stringify(matrices.map(m => m.data));

  test(
    "Given Network is initialized, " + 
    "When the loaded data contains incorrect weight dimensions, " +
    "Then an error is thrown", () => {

      // Arrange
      const invalid: NetworkData = { weights: original.save().biases }
      const copy = new NeuralNetwork(testConfig).initialize();

      // Act
      // Assert
      expect(() => copy.load(invalid)).toThrowError();

    })

  test(
    "Given Network is initialized, " + 
    "When the loaded data contains incorrect bias dimensions, " +
    "Then an error is thrown", () => {

      // Arrange
      const invalid: NetworkData = { biases: original.save().weights }
      const copy = new NeuralNetwork(testConfig).initialize();

      // Act
      // Assert
      expect(() => copy.load(invalid)).toThrowError();

    })

})