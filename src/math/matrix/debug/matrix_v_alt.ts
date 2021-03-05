import { Matrix } from "../Matrix";
import { MatrixAlt } from "../MatrixAlt";

export const DEBUG_Matrix_vs_MatrixAlt = (): void => {

  // ==================
  // == Debug Matrix ==
  // ==================

  let i = 0
  const helper = (x: number): number => { i++; return x + i; }

  const rect1 = new Matrix(2,3).map(helper);
  console.log(rect1.data);
  rect1.print("magenta");

  const rect2 = new Matrix(3,2).map(helper);
  console.log(rect2.data);
  rect2.print("magenta");

  const rect3 = Matrix.BuildFromArray([1,2,3,4,5,6]);
  console.log(rect3.data);
  rect3.print("magenta");

  
  // =====================
  // == Debug MatrixAlt ==
  // =====================

  i = 0;
  const rect4 = new MatrixAlt(2,3).map(helper);
  console.log(rect4.data);
  rect4.print("cyan");

  const rect5 = new MatrixAlt(3,2).map(helper);
  console.log(rect5.data);
  rect5.print("cyan");

  const rect6 = MatrixAlt.BuildFromArray([1,2,3,4,5,6]);
  console.log(rect6.data);
  rect6.print("cyan");
}
