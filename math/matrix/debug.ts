import { Matrix } from "./Matrix";

export const DEBUG_STATIC_BuildFromArray = (): void => {
  console.log(`
    BUILD
  ---------
  `);

  const arr = [1,2,3,4,5];
  console.log(arr);
  Matrix.BuildFromArray(arr).print();
}

export const DEBUG_STATIC_FlattenToArray = (): void => {
  console.log(`
    FLATTEN
  -----------
  `);

  let i = 0;
  const a = new Matrix(2,3).map(x => { i++; return i });

  a.print();

  const arr: number[] = Matrix.FlattenToArray(a);
  console.log(arr);
}

export const DEBUG_STATIC_DotProduct = (): void => {
  let i = 0;
  const a = new Matrix(10,6).map(x => { i++; return i });
  const b = new Matrix(6,1).map(x => { i++; return i });

  console.log(`
    DOT PRODUCT
  ---------------
  `);

  a.print();
  b.print();
  Matrix.DotProduct(a, b).print();

}

export const DEBUG_STATIC_Addition = (): void => {
  console.log(`
    ADDITION
  ------------
  `);

  let i = 0;
  const a = new Matrix(3,3).map(x => { i++; return i });
  const b = new Matrix(3,3).map(x => { i++; return i });

  a.print();
  b.print();

  Matrix.Add(a,b).print();
}

export const DEBUG_STATIC_Subtraction = (): void => {

  console.log(`
    SUBTRACTION
  ---------------
  `);

  let i = 0;
  const a = new Matrix(3,3).map(x => { i++; return i * 3 });
  const b = new Matrix(3,3).map(x => { i++; return i * 2 });

  a.print();
  b.print();

  Matrix.Subtract(b,a).print();
}

export const DEBUG_STATIC_Transpose = (): void => {

  console.log(`
    TRANSPOSE
  -------------
  `);

  let i = 0;
  const a = new Matrix(2,3).map(x => { i++; return i });

  a.print();

  Matrix.Transpose(a).print();
}