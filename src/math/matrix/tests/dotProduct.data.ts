import { Matrix } from "../Matrix";
import { IMatrixMathInstanceTestData, IMatrixMathStaticTestData } from "./_interfaces";

const randomizer = (x: number) => Math.floor(Math.random() * x + 1);
const converter = ({
  description,
  left,
  right,
  expected,
  errorMessage
}: IMatrixMathStaticTestData): IMatrixMathInstanceTestData => ({
  description,
  self: left,
  param: right,
  expected,
  errorMessage
})

const GenerateReciprocalMatrix = ( limit: number = 50 ): IMatrixMathStaticTestData => {
  const shared = randomizer(limit);
  const leftRows = randomizer(limit);
  const rightCols = randomizer(limit);
  return {
    description: `Should PASS when A.cols = B.rows (${leftRows}x${shared} * ${shared}x${rightCols})`,
    left: new Matrix(leftRows, shared).map(x => 2),
    right: new Matrix(shared, rightCols).map(x => 3),
    expected: new Matrix(leftRows, rightCols).map(x => (2 * 3) * shared).data
  }
};

const GenerateIdentityProducts = ( limit: number = 50 ): IMatrixMathStaticTestData => {
  const size = randomizer(limit);
  const matrix = new Matrix(size, size).map(x => randomizer(10));
  return {
    description: `Should be unchanged when multiplied with identity matrix (${size}x${size})`,
    left: matrix,
    right: Matrix.BuildIdentity(size),
    expected: matrix.data
  }
};

const GenerateMismatchedMatrix = ( limit: number = 50 ): IMatrixMathStaticTestData => {
 let l1 = randomizer(limit) ;
 let l2 = randomizer(limit) ;
 let r1 = randomizer(limit) ;
 let r2 = randomizer(limit) ;

 if (l2 === r1) r1++;

 return {
   description: `Should FAIL when A.cols != B.rows (${l1}x${l2}) * (${r1}x${r2})`,
   left: new Matrix(l1,l2),
   right: new Matrix(r1,r2),
   errorMessage: '[Dot Product Error] Mismatched rows and colums'
 }

}

export const static_DotProduct_Pass: IMatrixMathStaticTestData[] = [
  {
    description: 'Should PASS when A.cols = B.rows (2x3) * (3x2)',
    left: new Matrix(2,3).map(x => 3),
    right: new Matrix(3,2).map(x => 4),
    expected: new Matrix(2,2).map(x => (3 * 4) * 3).data
  },
  ...new Array(10).fill(50).map(GenerateReciprocalMatrix),
  ...new Array(10).fill(50).map(GenerateIdentityProducts)
];

export const static_DotProduct_Fail: IMatrixMathStaticTestData[] = [
  {
    description: 'Should FAIL when A.cols != B.rows (1x2) * (3x1)',
    left: new Matrix(1,2).map(x => 3),
    right: new Matrix(3,1).map(x => 4),
    errorMessage: '[Dot Product Error] Mismatched rows and colums'
  },
  ...new Array(50).fill(50).map(GenerateMismatchedMatrix)
];

export const instance_DotProduct_Pass: IMatrixMathInstanceTestData[] = [
  {
    description: 'Should PASS when A.cols = B.rows (2x3) * (3x2)',
    self: new Matrix(2,3).map(x => 3),
    param: new Matrix(3,2).map(x => 4),
    expected: new Matrix(2,2).map(x => (3 * 4) * 3).data
  },
  ...new Array(10).fill(50).map(GenerateReciprocalMatrix).map(converter),
  ...new Array(10).fill(50).map(GenerateIdentityProducts).map(converter)
];

export const instance_DotProduct_Fail: IMatrixMathInstanceTestData[] = [
  {
    description: 'Should FAIL when A.cols != B.rows (1x2) * (3x1)',
    self: new Matrix(1,2).map(x => 3),
    param: new Matrix(3,1).map(x => 4),
    errorMessage: '[Dot Product Error] Mismatched rows and colums'
  },
  ...new Array(50).fill(50).map(GenerateMismatchedMatrix).map(converter)
];