import { Matrix } from "../../../math/matrix/Matrix";
import { CostTestData, SqueezeFunctionTestData } from "../interfaces";

export const CostFunctionTestData: CostTestData[] = [
  {
    description: "Should map correctly when 1 away",
    input: {
      actual: Matrix.BuildFromData([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ]),
      expected: Matrix.BuildFromData([
        [ 2, 3, 4 ],
        [ 5, 6, 7 ]
      ])
    },
    output: Matrix.BuildFromData([
      [ 1, 1, 1 ],
      [ 1, 1, 1 ]
    ])
  },
  {
    description: "Should grow exponentially when further and further away",
    input: {
      actual: Matrix.BuildFromData([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ]),
      expected: Matrix.BuildFromData([
        [ 2, 4, 6 ],
        [ 8, 10, 12 ]
      ])
    },
    output: Matrix.BuildFromData([
      [ 1, 4, 9 ],
      [ 16, 25, 36 ]
    ])
  },
  {
    description: "Should work correctly with negative numbers",
    input: {
      actual: Matrix.BuildFromData([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ]),
      expected: Matrix.BuildFromData([
        [ 1, -2, 3 ],
        [ -4, 5, -6 ]
      ])
    },
    output: Matrix.BuildFromData([
      [ 0, 16, 0 ],
      [ 64, 0, 144 ]
    ])
  }
];

export const CostDerivativeFunctionTestData: CostTestData[] = [
  {
    description: "(Derivative) Should map correctly when 1 away",
    input: {
      actual: Matrix.BuildFromData([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ]),
      expected: Matrix.BuildFromData([
        [ 2, 3, 4 ],
        [ 5, 6, 7 ]
      ])
    },
    output: Matrix.BuildFromData([
      [ -2, -2, -2 ],
      [ -2, -2, -2 ]
    ])
  },
  {
    description: "(Derivative) Should grow exponentially when further and further away",
    input: {
      actual: Matrix.BuildFromData([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ]),
      expected: Matrix.BuildFromData([
        [ 2, 4, 6 ],
        [ 8, 10, 12 ]
      ])
    },
    output: Matrix.BuildFromData([
      [ -2, -4, -6 ],
      [ -8, -10, -12 ]
    ])
  },
  {
    description: "(Derivative) Should work correctly with negative numbers",
    input: {
      actual: Matrix.BuildFromData([
        [ 1, 2, 3 ],
        [ 4, 5, 6 ]
      ]),
      expected: Matrix.BuildFromData([
        [ 1, -2, 3 ],
        [ -4, 5, -6 ]
      ])
    },
    output: Matrix.BuildFromData([
      [ 0, 8, 0 ],
      [ 16, 0, 24 ]
    ])
  }
];

export const SigmoidTestData: SqueezeFunctionTestData[] = [
  {
    description: "Should squish big (positive) numbers to basically 1",
    input: 29357598345863,
    expected: 1
  },
  {
    description: "Should squish big (negative) numbers to basically 0",
    input: -29357598345863,
    expected: 0
  },
  {
    description: "Should squish small floating point numbers to near 0.5",
    input: 0.0001974,
    expected: 0.5
  },
  {
    description: "Should squish 0 to exactly 0.5",
    input: 0,
    expected: 0.5
  },
  {
    description: "Should squish 1 to basically 0.7310585787",
    input: 1,
    expected: 0.7310585787
  }
];

export const SigmoidDerivativeTestData: SqueezeFunctionTestData[] = [
  {
    description: "Should push big (positive) numbers to basically 0",
    input: 29357598345863,
    expected: 0
  },
  {
    description: "Should push big (negative) numbers to basically 0",
    input: -29357598345863,
    expected: 0
  },
  {
    description: "Should squish small floating point numbers to near 0.25",
    input: 0.0001974,
    expected: 0.25
  },
  {
    description: "Should squish 0 to exactly 0.25",
    input: 0,
    expected: 0.25
  },
  {
    description: "(Derivative) Should push 1 to basically 0.1966119332",
    input: 1,
    expected: 0.1966119332
  }
];