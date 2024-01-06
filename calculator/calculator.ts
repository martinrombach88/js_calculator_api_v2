//test function - uncomment and replace default constructor to view tests

// module.exports = class Calculator {
// 	constructor () {
// 		this.regex = /\d+|[\(\)\+\-\*\//]+/g;
// 		this.operators = /[\(\)\+\-\*\//]+/g;
// 	}
enum operators {
  exponent = "^",
  multiply = "*",
  divide = "/",
  plus = "+",
  minus = "-",
  empty = "",
}

export default class Calculator {
  regexNumsAndOps: RegExp;
  regexOps: RegExp;

  constructor() {
    this.regexNumsAndOps = /\d+|[\(\)\+\-\*\//]+/g;
    this.regexOps = /[\(\)\+\-\*\//]+/g;
  }

  testCalculate = (userCalculation: string) => {
    //test version of main calculate

    let calcArray: string[] | null = this.getInputArray(userCalculation);
    let postfixArray: (string | number)[] | null =
      this.convertInfixToPostfix(calcArray);
    let result: number | string = "";
    if (postfixArray) {
      result = this.runPostfixOperations(postfixArray);
    }

    return result;
  };
  /*
  calculate = () => {
    //main function to run all the supplementary functions

    //need new function to take input from the user?
    let userCalculation = prompt("Please enter your calculation");

    let calcArray = this.getInputArray(userCalculation);
    let postfixArray = this.convertInfixToPostfix(calcArray);
    alert(`${userCalculation} = ${this.runPostfixOperations(postfixArray)}`);
  };
*/

  getInputArray = (userInput: string | null): string[] | null => {
    //create array from regex + if string has two characters, split it
    let inputArray: RegExpMatchArray | null =
      typeof userInput === "string"
        ? userInput.match(this.regexNumsAndOps)
        : null;

    if (inputArray) {
      return inputArray.flatMap((char) =>
        char.length > 0 && char.match(this.regexOps) ? char.split("") : char
      );
    }
    return null;
  };

  precedenceSameOrHigher = (stack: string[], newItem: string) => {
    switch (newItem) {
      case operators.empty:
        return 0;
      case operators.minus || operators.plus:
        return 1;
      case operators.divide || operators.multiply:
        return 2;
      case operators.exponent:
        return 3;
      default:
        return 0;
    }
  };

  isOperator = (item: string) => {
    return item.match(this.regexOps);
  };
  //postfixResult: (string | number)[] = [];
  pushBracketOperators = (
    stack: string[],
    postfixResult: (string | number)[]
  ) => {
    //slice our all relevant operators and delete left bracket, append postfixResult
    let bracketOperators = stack.splice(stack.indexOf("("), stack.length - 1);
    bracketOperators.shift();
    return [...postfixResult, ...bracketOperators];
  };

  convertInfixToPostfix = (calcArray: string[] | null) => {
    //opStack acts as a stack, the end is the top, and the start is the bottom (lifo)
    let postfixResult: (string | number)[] = [];
    const opStack: string[] = [];
    let bracketOpen = false;
    if (calcArray)
      for (let i: number = 0; i < calcArray.length; i++) {
        let c: string = calcArray[i];
        let temp: number = parseInt(c);

        if (Number.isInteger(temp)) {
          postfixResult.push(temp);
          continue;
        }

        if (c === "(") {
          opStack.push(c);
          bracketOpen = true;
          continue;
        }

        if (bracketOpen && c === ")") {
          postfixResult = this.pushBracketOperators(opStack, postfixResult);
          bracketOpen = false;
          continue;
        }

        if (
          this.isOperator(c) &&
          bracketOpen &&
          !this.precedenceSameOrHigher(opStack, c)
        ) {
          opStack.push(c);
          continue;
        }

        if (this.isOperator(c) && this.precedenceSameOrHigher(opStack, c)) {
          let targetOperator = opStack.pop();
          if (targetOperator) {
            postfixResult.push(targetOperator);
          }

          //keep comparing and empty stack of rule breaking items
          while (this.precedenceSameOrHigher(opStack, c)) {
            let targetItem = opStack.pop();
            if (targetItem) {
              postfixResult.push(targetItem);
            }
          }
          opStack.push(c);
          continue;
        }

        if (this.isOperator(c) && !this.precedenceSameOrHigher(opStack, c)) {
          opStack.push(c);
          continue;
        }
      }
    if (opStack.length > 0) {
      postfixResult = [...postfixResult, ...opStack.reverse()];
    }
    return postfixResult;
  };

  runOperation = (operator: string, base: string, newnum: string) => {
    switch (operator) {
      case "+":
        return parseFloat(base) + parseFloat(newnum);
      case "-":
        return parseFloat(base) - parseFloat(newnum);
      case "*":
        return parseFloat(base) * parseFloat(newnum);
      case "/":
        return parseFloat(base) / parseFloat(newnum);
      default:
        return 0;
    }
  };

  runPostfixOperations(postfixArray: (number | string)[]) {
    let stack: (number | string)[] = [];
    for (let i: number = 0; i < postfixArray.length; i++) {
      let c: string | number = postfixArray[i];
      if (Number.isInteger(c)) {
        stack.push(c);
        continue;
      } else {
        if (typeof c === "string") {
          if (this.isOperator(c)) {
            let num1 = stack.pop();
            let num2 = stack.pop();
            let result;
            if (typeof num1 === "string" && typeof num2 === "string") {
              result = this.runOperation(c, num2, num1);
            }
            continue;
          }
        }
      }
    }
    return stack[0];
  }
}
