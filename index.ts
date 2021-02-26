import { NeuralNetwork } from "./network/Network";

const network = new NeuralNetwork({
  inputSize: 6,
  outputSize: 4
})
network.initialize();

const input = [ 0.1, 0.2, 0.3, 0.4, 0.5, 0.6 ];
const output = network.feedForward(input);

network.DEBUG();