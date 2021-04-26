/**
 * Training Data for the Neural Network
 */
export type TrainingExample = {
  input: number[];
  output: number[];
} | {
  input: Record<string, number>;
  output: Record<string, number>;
}