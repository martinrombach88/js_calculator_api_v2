export default class Calculator {
  regexNumsAndOps: RegExp;
  regexOps: RegExp;

  constructor() {
    this.regexNumsAndOps = /\d+|[\(\)\+\-\*\//]+/g;
    this.regexOps = /[\(\)\+\-\*\//]+/g;
  }

  calculate = (userCalculation: string): number | undefined => {
    //test version of main calculate
    let calcArray: string[] | null = this.getInputArray(userCalculation);
    let postfixArray: (string | number)[] | null =
      this.convertInfixToPostfix(calcArray);
    let result: string | number = this.runPostfixOperations(postfixArray);
    console.log("result ", result, " is a ", typeof result);
    if (typeof result === "number") {
      return result;
    }
  };

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

  precedenceSameOrHigher = (stack: string[], newItem: string): boolean => {
    //this function doesn't work the same way.
    // //compare top operators in stack with new item (current iteration)
    let topItem = stack[stack.length - 1];
    const operationRanks = {
      "^": 3,
      "*": 2,
      "/": 2,
      "+": 1,
      "-": 1,
      "": 0,
    };
    return operationRanks[topItem] >= operationRanks[newItem];
  };

  isOperator = (item: string): RegExpMatchArray | null => {
    return item.match(this.regexOps);
  };

  pushBracketOperators = (
    stack: string[],
    postfixResult: (string | number)[]
  ): (string | number)[] => {
    //slice our all relevant operators and delete left bracket, append postfixResult
    let bracketOperators = stack.splice(stack.indexOf("("), stack.length - 1);
    bracketOperators.shift();
    return [...postfixResult, ...bracketOperators];
  };

  convertInfixToPostfix = (calcArray: string[] | null): (string | number)[] => {
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

  runOperation = (operator: string, base: string, newnum: string): number => {
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

  runPostfixOperations(postfixArray: (number | string)[]): number | string {
    //any is not recommended but type string | number returns errors - come back to this!
    let stack: any[] = [];
    for (let i: number = 0; i < postfixArray.length; i++) {
      //any is not recommended but type string | number returns errors - come back to this!
      let c: any = postfixArray[i];
      if (Number.isInteger(c)) {
        stack.push(c);
        continue;
      }

      if (this.isOperator(c)) {
        let num1 = stack.pop();
        let num2 = stack.pop();
        stack.push(this.runOperation(c, num2, num1));
        continue;
      }
    }
    return stack[0];
  }
}
