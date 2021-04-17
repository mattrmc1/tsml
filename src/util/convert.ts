import { InputLayerComplex, InputLayerSimple, OutputLayerComplex, OutputLayerSimple } from "../@types/NetworkIO";
import { TrainingComplex, TrainingSimple } from "../@types/NetworkTraining";

const parseLayer = (input: Record<string, number>): {
  keys: string[],
  values: number[]
} => {

  const keys = [];
  const values = [];

  Object
    .keys(input)
    .sort()
    .forEach(k => {
      keys.push(k);
      values.push(input[k]);
    });
  return { keys, values }
}

export class Converter {
  static Input = (input: InputLayerComplex): { keys: string[], values: InputLayerSimple } => parseLayer(input);
  static Output = (output: OutputLayerComplex): { keys: string[], values: OutputLayerSimple } => parseLayer(output);
  static Training = (data: TrainingComplex[]): { keys: string[], simplified: TrainingSimple[] } => {

    let keys: string[] = [];

    const simplified: TrainingSimple[] = data.map(({ input, output }) => {
      
      const parsedInput = Converter.Input(input);
      const parsedOutput = Converter.Output(output);

      keys = parsedOutput.keys;

      return { input: parsedInput.values, output: parsedOutput.values }
    });

    return { keys, simplified };
  }
}