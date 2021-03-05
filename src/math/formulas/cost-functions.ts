import { Matrix } from "../matrix/Matrix";

// C = (a(L) - y)^2
export const cost = (actual: Matrix, expected: Matrix) => Matrix.Subtract(actual, expected).map(m => m * m);

// C' = 2(a(L) - y)
export const deltaCost = (actual: Matrix, expected: Matrix) => Matrix.Subtract(actual, expected).map(m => 2 * m);