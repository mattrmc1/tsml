interface IMatrix {

  /**
   * Number of rows
   * 
   * [ [1,2,3], [4,5,6] ] => 3 rows
   */
  rows: number;

  /**
   * Number of columns
   * 
   * [ [1,2], [3,4], [5,6] ] => 3 columns
   */
  cols: number;

  /**
   * Two-dimensional array representation of the matrix
   */
  data: number[][];

  /**
   * Add a Matrix or Scalar
   * @param input Matrix or Scalar to be added
   * @returns this
   */
  add(input: IMatrix | number): IMatrix;

  /**
   * Subtract a Matrix or Scalar
   * @param input Matrix or Scalar to be subtracted
   * @returns this
   */
  substract(input: IMatrix | number): IMatrix;

  /**
   * Iterate through every element without mutating any 
   * of the elements' values
   * 
   * @param func Function to call for each element in iteration
   * @returns this
   */
  forEach(func: (n: number) => any): IMatrix;

  /**
   * Map through every element and mutate the element's value 
   * with the mapper function provided
   * @param func Function to apply to each element
   * @returns this
   */
  map(func: (n: number) => number): IMatrix;

  /**
   * Randomize the values of all elements within this matrix
   * @returns this
   */
  randomize(): IMatrix;

  /**
   * Print Matrix to the console
   * @param color Specifies which color to use from chalk.color
   * (Defaults to "green")
   */
  print(color?: string): IMatrix;
}

export default IMatrix;