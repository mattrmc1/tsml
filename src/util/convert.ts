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

interface Data {
  input: Record<string, number>,
  output: Record<string, number>
}
interface Simplified {
  input: number[],
  output: number[]
}

export class Converter {
  static Input = (input: Record<string, number>): { keys: string[], values: number[] } => parseLayer(input);
  static Output = (output: Record<string, number>): { keys: string[], values: number[] } => parseLayer(output);
  static Training = (data: Data[]): { inputKeys: string[], outputKeys: string[], simplified: Simplified[] } => {

    let inputKeys: string[] = [];
    let outputKeys: string[] = [];

    const simplified: Simplified[] = data.map(({ input, output }) => {
      
      const parsedInput = Converter.Input(input);
      const parsedOutput = Converter.Output(output);

      inputKeys = parsedInput.keys;
      outputKeys = parsedOutput.keys;

      return { input: parsedInput.values, output: parsedOutput.values }
    });

    return { inputKeys, outputKeys, simplified };
  }
}