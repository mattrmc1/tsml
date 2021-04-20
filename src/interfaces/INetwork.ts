import { InputLayerComplex, InputLayerSimple, OutputLayerComplex, OutputLayerSimple } from "../@types/NetworkIO";
import { TrainingComplex, TrainingSimple } from "../@types/NetworkTraining";
import { NeuralNetwork } from "../network/Network";

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

  /**
   * Runs the feed forward algorithm with the current weights and biases
   * @param input Input activation layer
   * @returns A guess at Output activation layer
   */
  run(input: InputLayerSimple | InputLayerComplex): OutputLayerSimple | OutputLayerComplex;

  /**
   * Async (Promise): Feed forward with current weights and biases
   * @param input Input activation layer
   * @returns A guess at Output activation layer
   */
  runAsync(input: InputLayerSimple | InputLayerComplex): Promise<OutputLayerSimple | OutputLayerComplex>;


  /**
   * Trains the neural network with given test data
   * @param data Test data to train the system
   * @returns Error Cost after all tests
   */
  train(training: TrainingSimple[] | TrainingComplex[]): number | void

  /**
   * Async (Promise): Trains the neural network with given test data
   * @param data Test data to train the system
   * @returns Error Cost after all tests
   */
  trainAsync(training: TrainingSimple[] | TrainingComplex[]): Promise<number | void>
}