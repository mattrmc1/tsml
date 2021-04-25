# tsml
### TypeScript Machine Learning
A general Machine Learning library written in TypeScript

```ts
import { NeuralNetwork } from 'tsml';

const config: NetworkConfig = { inputSize: 2, outputSize: 1 };
const network: NeuralNetwork = new NeuralNetwork(config).initialize();

const totalCost: number = network.train([
  { input: [0, 0], output: [0] },
  { input: [1, 1], output: [0] },
  { input: [1, 0], output: [1] },
  { input: [0, 1], output: [1] }
]);
const results: number[] = network.run([1, 0]);
```

## Installation
Install using npm or yarn


```sh
$ npm i tsml
```
```sh
$ yarn add tsml
```

## Quick Start
#### 1. Create and initialize the Neural Network
```ts
import { NeuralNetwork } from 'tsml';

const network = new NeuralNetwork({
  inputSize: 3,
  outputSize: 2
});

network.initialize();
```
#### 2. Train the Neural Network
```ts
const training = [
  {
    input: [ 0.62, 0.72, 0.88 ],
    output: [ 1, 0 ]
  },
  {
    input: [ 0.1, 0.84, 0.72 ],
    output: [ 1, 0 ]
  },
  {
    input: [ 0.33, 0.24, 0.29 ],
    output: [ 0, 1 ]
  }
];

network.train(training);
```
#### 3. Run the Neural Network
```ts
const result: number[] = network.run([ 0.65, 0.34, 0.81 ]);
// Do something with the result
```

## Examples
It is often desireable to use objects instead of arrays to make the neural network data more legible. This functionality is supported. Let's use the same data from "Quick Start" above:
```ts
// Step 1 (Create and initialize)
// This all stays the same
import { NeuralNetwork } from 'tsml';

const network = new NeuralNetwork({
  inputSize: 3,
  outputSize: 2
});

network.initialize();

// ---

// Step 2 (Training)
// Hopefully, now it's a little clearer what we intend the network to do
const training = [
  {
    input: { red: 0.62, green: 0.72, blue: 0.88 },
    output: { isLight: 1, isDark: 0 }
  },
  {
    input: { red: 0.1, green: 0.84, blue: 0.72 },
    output: { isLight: 1, isDark: 0 }
  },
  {
    input: { red: 0.33, green: 0.24, blue: 0.29 },
    output: { isLight: 0, isDark: 1 }
  }
];

network.train(training);

// ---

// Step 3 (Run)
const data = { red: 0.65, green: 0.34, blue: 0.81 };
const { isLight, isDark } = network.run(data);
```

## Configuration
```ts
type NetworkConfig = {
  inputSize: number;
  outputSize: number;
  layerSizes?: number[];
  maxIterations?: number;
  learningRate?: number;
  errorThreshold?: number;
}

// The default config is available as a static property in the NeuralNetwork class
NeuralNetwork.DEFAULT_CONFIG: NetworkConfig = {
  layerSizes: [3, 3],
  maxIterations: 10000,
  learningRate: 0.1,
  errorThreshold: 0.001
}
```
* `inputSize` - The expected number of neurons in the input layer
* `outputSize` - The expected number of neurons in the output layer
* (Optional) `layerSizes` - The number and size of the hidden layers.
  * _The length of the array corresponds to the number of hidden layers_
  * _Each number in the array corresponds to the number of neurons in that hidden layer_
* (Optional) `maxIterations` - How many times during training the network should attempt to reach the desired error threshold before exiting
* (Optional) `learningRate` - The rate at which the network "learns"
* (Optional) `errorThreshold` - The target "total cost" of the network that, if reached, will halt iterating through the training data

__Note:__ Currently, `inputSize` and `outputSize` must be set __BEFORE__ running `network.initialize()`

## License
[MIT](https://github.com/mattrmc1/tsml/blob/master/LICENSE)