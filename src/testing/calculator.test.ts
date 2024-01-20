import Calculator from "../calculator/calculator";

describe("Calculator", () => {
  const testCalc = new Calculator();

  test("getInputArray -> 1+1 becomes [1 + 1]", () => {
    expect(testCalc.getInputArray("1+1")).toStrictEqual(["1", "+", "1"]);
  });

  test("getInputArray -> (1+1)(1+1) becomes [ ( 1 + 1 ) ( 1 + 1 ) ]", () => {
    expect(testCalc.getInputArray("(1+1)(1+1)")).toStrictEqual([
      "(",
      "1",
      "+",
      "1",
      ")",
      "(",
      "1",
      "+",
      "1",
      ")",
    ]);
  });

  test("getInputArray -> )( becomes [ ) ( ]", () => {
    expect(testCalc.getInputArray(")(")).toStrictEqual([")", "("]);
  });

  test("convertInfixToPostfix -> 1 * 2 + 3 -> 1 2 * 3 +", () => {
    expect(
      testCalc.convertInfixToPostfix(["1", "*", "2", "+", "3"])
    ).toStrictEqual([1, 2, "*", 3, "+"]);
  });

  test("convertInfixToPostfix -> 1 * (2 + 3) -> 1 2 3 + *", () => {
    expect(
      testCalc.convertInfixToPostfix(["1", "*", "(", "2", "+", "3", ")"])
    ).toStrictEqual([1, 2, 3, "+", "*"]);
  });

  test("convertInfixToPostfix -> Infix 1+2/3 * (4+5) - 6 -> 1 2 3 / 4 5 + * + 6 - ", () => {
    expect(
      testCalc.convertInfixToPostfix([
        "1",
        "+",
        "2",
        "/",
        "3",
        "*",
        "(",
        "4",
        "+",
        "5",
        ")",
        "-",
        "6",
      ])
    ).toStrictEqual([1, 2, 3, "/", 4, 5, "+", "*", "+", 6, "-"]);
  });

  test("calculate -> 1+1 = 2", () => {
    expect(testCalc.calculate("1 + 1")).toStrictEqual(2);
  });

  test("calculate -> 1 * 2 + 3", () => {
    expect(testCalc.calculate("1 * 2 + 3")).toStrictEqual(5);
  });

  test("calculate -> 1+2/3 * (4+5) - 6", () => {
    expect(testCalc.calculate("1 + 2 / 3 * ( 4 + 5 ) - 6")).toStrictEqual(1);
  });
});
