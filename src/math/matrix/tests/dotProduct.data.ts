import { Matrix } from "../Matrix";
import { converter, GenerateIdentityProducts, GenerateMismatchedMatrix, GenerateReciprocalMatrix } from "./_helpers";
import { IMatrixMathInstanceTestData, IMatrixMathStaticTestData } from "./_interfaces";

const GENERATE_TESTS: number = 10;
const MAX_MATRIX_SIZE: number = 20

export const static_DotProduct_Pass: IMatrixMathStaticTestData[] = [
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

export const static_DotProduct_Fail: IMatrixMathStaticTestData[] = [
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

export const instance_DotProduct_Pass: IMatrixMathInstanceTestData[] = [
  {
    description: 'Should PASS when A.cols = B.rows (2x3) * (3x2)',
    self: new Matrix(2,3).map(x => 3),
    param: new Matrix(3,2).map(x => 4),
    expected: new Matrix(2,2).map(x => (3 * 4) * 3).data
  },

  ...new Array(GENERATE_TESTS)
    .fill(MAX_MATRIX_SIZE)
    .map(GenerateReciprocalMatrix).map(converter),

  ...new Array(GENERATE_TESTS)
    .fill(MAX_MATRIX_SIZE)
    .map(GenerateIdentityProducts).map(converter)
];

export const instance_DotProduct_Fail: IMatrixMathInstanceTestData[] = [
  {
    description: 'Should FAIL when A.cols != B.rows (1x2) * (3x1)',
    self: new Matrix(1,2).map(x => 3),
    param: new Matrix(3,1).map(x => 4),
    errorMessage: '[Dot Product Error] Mismatched rows and colums'
  },

  ...new Array(GENERATE_TESTS)
    .fill(MAX_MATRIX_SIZE)
    .map(GenerateMismatchedMatrix).map(converter)
];