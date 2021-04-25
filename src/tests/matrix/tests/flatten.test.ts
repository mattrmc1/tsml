import { Matrix } from "../../../math/matrix/Matrix";
import { FlattenToArray_Fail, FlattenToArray_Pass } from "../data/flatten.data";

fdescribe("Matric Static FlattenToArray", () => {

  // Passing Tests
  FlattenToArray_Pass.forEach(({ description, input, expected}) => {
    test(description, () => {
      expect(Matrix.FlattenToArray(input)).toStrictEqual(expected);
    })
  }),

  // Failing Tests
  FlattenToArray_Fail.forEach(({ description, input, errorMessage}) => {
    test(description, () => {
      expect(() => Matrix.FlattenToArray(input)).toThrow(errorMessage);
    })
  })

  // Edge Case
  test('Should FAIL correctly on undefined argument', () => {
    expect(() => Matrix.FlattenToArray(undefined)).toThrow('[FlattenToArray] Undefined argument');
  })
})