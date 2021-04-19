import { NetworkConfig } from "./@types/NetworkConfig";
import { NeuralNetwork } from "./network/Network";

const chalk = require('chalk');

const config: NetworkConfig = {
  inputSize: 4,
  outputSize: 2,
  layerSizes: [4, 3],
  maxIterations: 10000,
  learningRate: 0.1
};

const network = new NeuralNetwork(config);

// 1 = even index, 0 = odd index
const tests = [
  {
    input: [ 1, 0, 0, 0 ],
    output: [ 1, 1 ]
  },
  {
    input: [ 0, 0, 1, 0 ],
    output: [ 1, 1 ]
  },
  {
    input: [ 0, 1, 0, 0 ],
    output: [ 0, 0 ]
  },
  {
    input: [ 0, 0, 0, 1 ],
    output: [ 0, 0 ]
  }
];

const testsObjects = [
  {
    input: {
      a: 1,
      b: 0,
      c: 0,
      d: 0
    },
    output: {
      answer1: 1,
      answer2: 1
    }
  },
  {
    input: {
      a: 0,
      b: 0,
      c: 1,
      d: 0
    },
    output: {
      answer1: 1,
      answer2: 1
    }
  },
  {
    input: {
      a: 0,
      b: 1,
      c: 0,
      d: 0
    },
    output: {
      answer1: 0,
      answer2: 0
    }
  },
  {
    input: {
      a: 0,
      b: 0,
      c: 0,
      d: 1
    },
    output: {
      answer1: 0,
      answer2: 0
    }
  },
];

const testsObjectsUnorganized = [
  {
    input: {
      c: 0,
      a: 1,
      b: 0,
      d: 0
    },
    output: {
      answer1: 1,
      answer2: 1
    }
  },
  {
    input: {
      b: 0,
      a: 0,
      c: 1,
      d: 0
    },
    output: {
      answer1: 1,
      answer2: 1
    }
  },
  {
    input: {
      a: 0,
      b: 1,
      c: 0,
      d: 0
    },
    output: {
      answer2: 0,
      answer1: 0,
    }
  },
  {
    input: {
      a: 0,
      b: 0,
      d: 1,
      c: 0,
    },
    output: {
      answer1: 0,
      answer2: 0
    }
  },
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
  const cost = await network.trainAsync(tests);
  console.log('Cost: ', cost);

  console.log(chalk.yellow('Running smart...'));
  for(let i = 0; i < tests.length; i++) {
    const actual = await network.runAsync(tests[i].input);
    smarts.push({ expected: tests[i].output, actual });
  }

  console.log('SMART');
  console.log(smarts);
}

const runSmartObject = (): void => {

  const smarts = [];

  console.log(chalk.yellow('Learning...'));
  const cost = network.train(testsObjects);
  console.log('Cost: ', cost);

  console.log(chalk.yellow('Running smart (alt)...'));
  for(let i = 0; i < testsObjects.length; i++) {
    const actual = network.run(testsObjects[i].input);
    smarts.push({ expected: testsObjects[i].output, actual: JSON.stringify(actual) });
  }

  console.log('SMART');
  console.log(smarts);
}

const runSmartObjectUnorganized = (): void => {
  const smarts = [];

  console.log(chalk.yellow('Learning...'));
  const cost = network.train(testsObjectsUnorganized);
  console.log('Cost: ', cost);

  console.log(chalk.yellow('Running smart (alt)...'));
  for(let i = 0; i < testsObjectsUnorganized.length; i++) {
    const actual = network.run(testsObjectsUnorganized[i].input);
    smarts.push({ expected: testsObjectsUnorganized[i].output, actual: JSON.stringify(actual) });
  }

  console.log('SMART');
  console.log(smarts);
}

export const runExample = async (): Promise<void> => {

  console.log(chalk.yellow('Async Initializing...'));
  network.initialize();
  // await runDumb();
  runSmart();
}

export const runExampleObject = (): void => {

  console.log(chalk.yellow('Organized Initializing...'));
  network.initialize();

  runSmartObject();
}

export const runExampleObjectUnorganized = (): void => {

  console.log(chalk.yellow('Unorganized Initializing...'));
  network.initialize();

  runSmartObjectUnorganized();
}
