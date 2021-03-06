import { Matrix } from "../Matrix";
import { IMatrixMathInstanceTestData, IMatrixMathStaticTestData, IMatrixTransposeTestData } from "./_interfaces";

export const randomizer = (x: number) => Math.floor(Math.random() * x + 1);

export const converter = ({
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

export const GenerateIdentityProducts = ( limit: number ): IMatrixMathStaticTestData => {
  const size = randomizer(limit);
  const matrix = new Matrix(size, size).map(x => randomizer(10));
  return {
    description: `Should be unchanged when multiplied with identity matrix (${size}x${size})`,
    left: matrix,
    right: Matrix.BuildIdentity(size),
    expected: matrix.data
  }
};

export const GenerateMismatchedMatrix = ( limit: number ): IMatrixMathStaticTestData => {
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

export const GenerateReciprocalMatrix = ( limit: number ): IMatrixMathStaticTestData => {
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

export const GenerateTransposedMatrix = ( limit: number): IMatrixTransposeTestData => {
  const rows = randomizer(limit);
  const cols = randomizer(limit);
  return {
    description: 'Should PASS and return correctly transposed Matrix',
    input: new Matrix(rows, cols).map(x => 1),
    expected: new Matrix(cols, rows).map(x => 1)
  }
}