export type NetworkConfig = {
  inputSize?: number;
  outputSize?: number;
  layerSizes?: number[];
  maxIterations?: number;
  learningRate?: number;
  errorThreshold?: number;
};
