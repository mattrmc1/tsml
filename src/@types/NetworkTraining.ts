import {
  InputLayerComplex,
  InputLayerSimple,
  OutputLayerComplex,
  OutputLayerSimple
} from "./NetworkIO"

/**
 * Training data in the form of arrays
 */
export type TrainingSimple = {
  input: InputLayerSimple;
  output: OutputLayerSimple;
}

/**
 * Training data in the form of objects
 */
export type TrainingComplex = {
  input: InputLayerComplex;
  output: OutputLayerComplex;
}