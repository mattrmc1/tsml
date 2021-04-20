import { NetworkConfig } from "../../../@types/NetworkConfig";
import { TrainingComplex, TrainingSimple } from "../../../@types/NetworkTraining";

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
]