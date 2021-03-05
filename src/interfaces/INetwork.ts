import { NetworkTraining } from "../@types/NetworkTraining";

export interface INetwork {

  /**
   * Creates Matrices for activations, weights, and biases.
   * 
   * • Activation layers are initialized so that all values = 0. 
   * 
   * • Weights and Biases are given a random value between 0 and 1
   * 
   * NOTE: Sizes of input, output, and hidden layers are 
   * expected to already have been set
   */
  initialize(): void;

  /**
   * Runs the feed forward algorithm with the current weights and biases
   * @param input Input activation layer
   * @returns A guess at Output activation layer
   */
  run(input: number[]): number[];

  /**
   * Trains the neural network with given test data
   * @param data Test data to train the system
   * @returns Error Cost after all tests
   */
  train(data: NetworkTraining[]): number | void

  /**
   * Async (Promise): Trains the neural network with given test data
   * @param data Test data to train the system
   * @returns Error Cost after all tests
   */
  trainAsync(data: NetworkTraining[]): Promise<number | void>
}