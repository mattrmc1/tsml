import { NetworkConfig } from "../../../@types/NetworkConfig";
import { TrainingComplex, TrainingSimple } from "../../../@types/NetworkTraining";
import { ITrainingFailureData } from "../interfaces";

export const testConfig: NetworkConfig = {
  inputSize: 4,
  outputSize: 2
}

export const simple: TrainingSimple[] = [
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

export const organized: TrainingComplex[] = [
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

export const unorganized: TrainingComplex[] = [
  {
    input: {
      c: 0,
      a: 1,
      b: 0,
      d: 0
    },
    output: {
      answer2: 1,
      answer1: 1
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

export const invalid: ITrainingFailureData[] = [
  {
    description: 'Error when trained with empty training data',
    message: '[Training] Training data cannot be null, undefined, or empty',
    data: []
  },
  {
    description: 'Error when trained with null training data',
    message: '[Training] Training data cannot be null, undefined, or empty',
    data: null
  },
  {
    description: 'Error when trained with undefined training data',
    message: '[Training] Training data cannot be null, undefined, or empty',
    data: undefined
  },
  {
    description: 'Error when trained with empty input array',
    message: '[Training] Input cannot be empty',
    data: [
      {
        input: [],
        output: [ 0.1, 0.2, 0.3 ]
      }
    ]
  },
  {
    description: 'Error when trained with empty input object',
    message: '[Training] Input cannot be empty',
    data: [
      {
        input: {},
        output: {
          a: 0.1,
          b: 0.2,
          c: 0.3
        }
      }
    ]
  },
  {
    description: 'Error when trained with empty output array',
    message: '[Training] Output cannot be empty',
    data: [
      {
        input: [ 0.1, 0.2, 0.3 ],
        output: []
      }
    ]
  },
  {
    description: 'Error when trained with empty output object',
    message: '[Training] Output cannot be empty',
    data: [
      {
        input: {
          a: 0.1,
          b: 0.2,
          c: 0.3
        },
        output: {}
      }
    ]
  },
  {
    description: 'Error when trained with incorrect input layer size (array)',
    message: "[Training] The input array length (2) did not match the network's expected input size (4)",
    data: [
      {
        input: [ 0.5, 0.2 ],
        output: [ 0.1, 0.1 ]
      }
    ]
  },
  {
    description: 'Error when trained with incorrect output layer size (array)',
    message: "[Training] The output array length (3) did not match the network's expected output size (2)",
    data: [
      {
        input: [ 0.5, 0.2, 0.3, 0.6 ],
        output: [ 0.1, 0.1, 0.2 ]
      }
    ]
  },
  {
    description: 'Error when trained with out-of-bounds input layer (array)',
    message: '[Training] Input/Output values must be between 0 and 1',
    data: [
      {
        input: [ 1, 2, 0.5, 5 ],
        output: [ 0.1, 0.1 ]
      }
    ]
  },
  {
    description: 'Error when trained with out-of-bounds output layer (array)',
    message: '[Training] Input/Output values must be between 0 and 1',
    data: [
      {
        input: [ 0.1, 0.1, 0.1, 0.1],
        output: [ 0.3, 7 ]
      }
    ]
  },
  {
    description: 'Error when trained with incorrect input layer size (object)',
    message: "[Training] The input array length (2) did not match the network's expected input size (4)",
    data: [
      {
        input: { a: 0.5, b: 0.2 },
        output: { answer1: 0.1, answer2: 0.1 }
      }
    ]
  },
  {
    description: 'Error when trained with incorrect output layer size (object)',
    message: "[Training] The output array length (3) did not match the network's expected output size (2)",
    data: [
      {
        input: { a: 0.5, b: 0.2, c: 0.3, d: 0.6 },
        output: { answer1: 0.1, answer2: 0.1, answer3: 0.2 }
      }
    ]
  },
  {
    description: 'Error when trained with out-of-bounds input layer (object)',
    message: '[Training] Input/Output values must be between 0 and 1',
    data: [
      {
        input: { a: 1, b: 2, c: 0.5, d: 5 },
        output: { answer1: 0.1, answer2: 0.1 }
      }
    ]
  },
  {
    description: 'Error when trained with out-of-bounds output layer (object)',
    message: '[Training] Input/Output values must be between 0 and 1',
    data: [
      {
        input: { a: 0.1, b: 0.1, c: 0.1, d: 0.1 },
        output: { answer1: 0.3, answer2: 7 }
      }
    ]
  }
];