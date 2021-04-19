describe("Network E2E", () => {

  // PASSING
  // • Init, train, run gives reasonable answer
  // • Simple <-> Complex permutations
  //   - PASS: Simple train, Simple run
  //   - PASS: Complex train, Complex run

  // FAILING
  // • Simple <-> Complex permutations
  //   - FAIL: Simple train, Complex run
  //   - FAIL: Complex train, Simple run

  test("Dummy", () => {
    // Arrange
    let x = 1;
    let y = 2;

    // Act
    let sum = x + y;

    // Assert
    expect(sum).toBe(3);

  })
})