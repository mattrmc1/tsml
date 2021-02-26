import { Matrix } from "./Matrix";

export const DEBUG_MATRIX_CLASS = () => {
  let i = 0;
  let a = new Matrix(2, 3).map(x => { i++; return i });
  let b = new Matrix(3, 2).map(x => { i++; return i });


  // console.log(`
  //   DOT PRODUCT
  // ---------------
  // `);

  // a = new Matrix(10,6).map(x => { i++; return i });
  // b = new Matrix(6,1).map(x => { i++; return i });

  // a.print();
  // b.print();
  // Matrix.DotProduct(a, b).print();





  // console.log(`
  //   ADDITION
  // ------------
  // `);

  // i = 0;
  // a = new Matrix(3,3).map(x => { i++; return i });
  // b = new Matrix(3,3).map(x => { i++; return i });

  // a.print();
  // b.print();

  // a = Matrix.Add(a,b).print();



  

  // console.log(`
  //   TRANSPOSE
  // -------------
  // `);

  // i = 0;
  // a = new Matrix(2,3).map(x => { i++; return i });

  // a.print();

  // Matrix.Transpose(a).print();





  // console.log(`
  //   FLATTEN
  // -----------
  // `);

  // i = 0;
  // a = new Matrix(2,3).map(x => { i++; return i });

  // a.print();

  // const arr = Matrix.FlattenToArray(a);
  // console.log(arr);
}