import { NetworkData } from "../@types/NetworkData";
import { TrainingExample } from "../@types/NetworkTraining";
import { NeuralNetwork } from "./Network";

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
  initialize(): NeuralNetwork;

  save(): NetworkData;

  /**
   * Load weights and biases directly into NeuralNetwork
   * @param data Weights and/or Biases to be loaded into the network
   */
  load(data: NetworkData): NeuralNetwork;

  /**
   * Trains the neural network with given test data
   * @param data Test data to train the system
   * @returns Error Cost after all tests
   */
  train(training: TrainingExample[]): number | void

  /**
   * Async (Promise): Trains the neural network with given test data
   * @param data Test data to train the system
   * @returns Error Cost after all tests
   */
  trainAsync(training: TrainingExample[]): Promise<number | void>

  /**
   * Runs the feed forward algorithm with the current weights and biases
   * @param input Input activation layer
   * @returns A guess at Output activation layer
   */
   run(input: number[]): number[];
   run(input: Record<string, number>): Record<string, number>;

   /**
    * Async (Promise): Feed forward with current weights and biases
    * @param input Input activation layer
    * @returns A guess at Output activation layer
    */
   runAsync(input: number[]): Promise<number[]>;
   runAsync(input: Record<string, number>): Promise<Record<string, number>>;
}