export const sigmoid = (x: number) => 1 / ( 1 + Math.exp(-x) );
export const deltaSigmoid = (x: number) => sigmoid(x) * ( 1 - sigmoid(x) );