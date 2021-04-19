import { NetworkConfig } from "../../../@types/NetworkConfig";
import { NeuralNetwork } from "../../../network/Network";

describe("Network Initialization", () => {

  // PASSING
  // • Config
  // • Sizes
  // • Activations
  // • Weights
  // • Biases
  // • Resets correctly

  // FAILING
  // Invalid layerSizes
  // Invalid maxIterations
  // Invalid learningRate
  // Invalid errorThreshold
  // Invalid input size
  // Invalid output size

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

  })

  test("Dummy", () => {
    // Arrange
    let x = 1;
    let y = 2;
    const network = new NeuralNetwork();

    // Act
    network.initialize();

    // Assert
    expect(x + y).toBe(3);

  })


})