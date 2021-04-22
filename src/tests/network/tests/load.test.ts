// TODO - Tests for Network.Load

import { NetworkData } from "../../../@types/NetworkIO";
import { NeuralNetwork } from "../../../network/Network"
import { testConfig } from "../data/training.data"

// PASSING
// Load weights and biases
// Load weights only
// Load biases only

// FAILING
// Invalid weights dimensions
// Invalid biases dimensions

describe("Network Loading", () => {

  test("Should throw error until implemented", () => {
    const network = new NeuralNetwork(testConfig).initialize();
    const data: NetworkData = {};
    expect(() => network.load(data)).toThrowError("Method not implemented.");
  });

})