import { Matrix } from "./math/matrix/Matrix";
import { MatrixStatic } from "./math/matrix/MatrixStatic";
import { NetworkConfig, NetworkTraining, NeuralNetwork } from "./network/Network";

const config: NetworkConfig = {
  inputSize: 4,
  outputSize: 1,
  layerSizes: [4, 3],
  iterations: 20
};

const network = new NeuralNetwork(config);

network.initialize();

// 1 = even index, 0 = odd index
const tests = [
  {
    input: [ 1, 0, 0, 0 ],
    output: [ 1 ]
  },
  {
    input: [ 0, 0, 1, 0 ],
    output: [ 1 ]
  },
  {
    input: [ 0, 1, 0, 0 ],
    output: [ 0 ]
  },
  {
    input: [ 0, 0, 0, 1 ],
    output: [ 0 ]
  }
];

const quiz = [ 0, 1, 0, 0];
const dumb = network.run(quiz);
console.log('Dumb guess: ', dumb);

// console.log('activations: ');
// network.DEBUG('activations');

// console.log('weights: ');
// network.DEBUG('weights');

// console.log('biases: ');
// network.DEBUG('biases');

network.train(tests);
const guess = network.run(quiz);
console.log('Educated guess: ', guess);