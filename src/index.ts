import { NetworkConfig } from "./@types/NetworkConfig";
import { NeuralNetwork } from "./network/Network";

export { NeuralNetwork } from './network/Network';

const chalk = require('chalk');

const config: NetworkConfig = {
  inputSize: 4,
  outputSize: 1,
  layerSizes: [4, 3],
  iterations: 20
};

const network = new NeuralNetwork(config);

console.log(chalk.yellow('Initializing...'));
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

const dumbs = [];
const smarts = []

console.log(chalk.yellow('Running dumb...'));
tests.forEach(t => {
  const actual = network.run(t.input);
  dumbs.push({
    expected: t.output,
    actual
  });
});

console.log(chalk.yellow('Learning...'));
network.train(tests);

console.log(chalk.yellow('Running smart...'));
tests.forEach(t => {
  const actual = network.run(t.input);
  smarts.push({
    expected: t.output,
    actual
  });
});

console.log('DUMB');
console.log(dumbs);

console.log('SMART');
console.log(smarts);