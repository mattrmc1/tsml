import { Matrix } from "../../../math/matrix/Matrix";
import { DeltaArrayTestData, DeltaMatrixTestData } from "../interfaces";

export const PerfectArrayDelta: DeltaArrayTestData = {
  input: [ 1, 0, 0 ],
  output: [ 0, 1 ],
  hidden: [
    [ 0.8, 0.8, 0.8 ],
    [ 0.8, 0.8, 0.8 ]
  ],
  weights: [
    [
      [ 0.5, 0.5, 0.5 ],
      [ 0.5, 0.5, 0.5 ],
      [ 0.5, 0.5, 0.5 ]
    ],
    [
      [ 0.5, 0.5, 0.5 ],
      [ 0.5, 0.5, 0.5 ],
      [ 0.5, 0.5, 0.5 ]
    ],
    [
      [ 0.5, 0.5, 0.5 ],
      [ 0.5, 0.5, 0.5 ]
    ]
  ],
  biases: [
    [ 0.5, 0.5, 0.5 ],
    [ 0.5, 0.5, 0.5 ],
    [ 0.5, 0.5 ],
  ],
  y: [ 0, 1 ]
};

export const PerfectMatrixDelta: DeltaMatrixTestData = {
  input: Matrix.BuildFromArray(PerfectArrayDelta.input),
  output: Matrix.BuildFromArray(PerfectArrayDelta.output),
  hidden: PerfectArrayDelta.hidden.map(h => Matrix.BuildFromArray(h)),
  weights: PerfectArrayDelta.weights.map(w =>  Matrix.BuildFromData(w)),
  biases: PerfectArrayDelta.biases.map(b => Matrix.BuildFromArray(b)),
  y: Matrix.BuildFromArray(PerfectArrayDelta.y)
};