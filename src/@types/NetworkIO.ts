export type NetworkData = {
  weights?: number[][][];
  biases?: number[][][];
}
export type InputLayerSimple = number[];
export type InputLayerComplex = Record<string, number>;
export type OutputLayerSimple = number[];
export type OutputLayerComplex = Record<string, number>;