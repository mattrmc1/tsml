import { NetworkConfig } from "./@types/NetworkConfig";
import { NeuralNetwork } from "./network/Network";

const chalk = require('chalk');

const config: NetworkConfig = {
  inputSize: 4,
  outputSize: 1,
  layerSizes: [4, 3]
};

const network = new NeuralNetwork(config);

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

const runDumb = async (): Promise<void> => {

  console.log(chalk.yellow('Running dumb...'));
  const dumbs = [];

  for (let i = 0; i < tests.length; i++) {
    const actual = await network.runAsync(tests[i].input);
    dumbs.push({ expected: tests[i].output, actual });
  }
  
  console.log('DUMB');
  console.log(dumbs);
}

const runSmart = async (): Promise<void> => {

  const smarts = [];

  console.log(chalk.yellow('Learning...'));
  await network.trainAsync(tests);

  console.log(chalk.yellow('Running smart...'));
  for(let i = 0; i < tests.length; i++) {
    const actual = await network.runAsync(tests[i].input);
    smarts.push({ expected: tests[i].output, actual });
  }

  console.log('SMART');
  console.log(smarts);
}

export const runExample = async (): Promise<void> => {

  console.log(chalk.yellow('Initializing...'));
  network.initialize();
  await runDumb();
  runSmart();
}
