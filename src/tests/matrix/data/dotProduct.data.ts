import { Matrix } from "../../../math/matrix/Matrix";
import { GenerateIdentityProducts, GenerateMismatchedMatrix, GenerateReciprocalMatrix } from "../helpers";
import { IMatrixMathStaticTestData } from "../interfaces";

const GENERATE_TESTS: number = 10;
const MAX_MATRIX_SIZE: number = 20

export const DotProduct_Pass: IMatrixMathStaticTestData[] = [
  {
    description: 'Should PASS when A.cols = B.rows (2x3) * (3x2)',
    left: new Matrix(2,3).map(x => 3),
    right: new Matrix(3,2).map(x => 4),
    expected: new Matrix(2,2).map(x => (3 * 4) * 3).data
  },

  ...new Array(GENERATE_TESTS)
    .fill(MAX_MATRIX_SIZE)
    .map(GenerateReciprocalMatrix),

  ...new Array(GENERATE_TESTS)
    .fill(MAX_MATRIX_SIZE)
    .map(GenerateIdentityProducts)
];

export const DotProduct_Fail: IMatrixMathStaticTestData[] = [
  {
    description: 'Should FAIL when A.cols != B.rows (1x2) * (3x1)',
    left: new Matrix(1,2).map(x => 3),
    right: new Matrix(3,1).map(x => 4),
    errorMessage: '[Dot Product Error] Mismatched rows and colums'
  },

  ...new Array(GENERATE_TESTS)
    .fill(MAX_MATRIX_SIZE)
    .map(GenerateMismatchedMatrix)
];