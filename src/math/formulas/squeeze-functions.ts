
/**
 * S = 1 / ( 1 + e^-x )
 * @param x 
 */
export const sigmoid = (x: number): number => 1 / ( 1 + Math.exp(-x) );

/**
 * S' = S(x) * ( 1 - S(x) )
 * @param x 
 */
export const deltaSigmoid = (x: number): number => sigmoid(x) * ( 1 - sigmoid(x) );