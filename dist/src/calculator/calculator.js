"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calculator {
    constructor() {
        this.calculate = (userCalculation) => {
            //test version of main calculate
            let calcArray = this.getInputArray(userCalculation);
            let postfixArray = this.convertInfixToPostfix(calcArray);
            let result = this.runPostfixOperations(postfixArray);
            if (typeof result === "number") {
                return result;
            }
        };
        this.getInputArray = (userInput) => {
            //create array from regex + if string has two characters, split it
            let inputArray = typeof userInput === "string"
                ? userInput.match(this.regexNumsAndOps)
                : null;
            if (inputArray) {
                return inputArray.flatMap((char) => char.length > 0 && char.match(this.regexOps) ? char.split("") : char);
            }
            return null;
        };
        this.precedenceSameOrHigher = (stack, newItem) => {
            let topItem = stack[stack.length - 1];
            const operationRanks = {
                "^": 3,
                "*": 2,
                "/": 2,
                "+": 1,
                "-": 1,
                "": 0,
            };
            //return boolean result of comparison of top operators, simulating pemdas by rank
            return operationRanks[topItem] >= operationRanks[newItem];
        };
        this.isOperator = (item) => {
            return item.match(this.regexOps);
        };
        this.pushBracketOperators = (stack, postfixResult) => {
            //slice our all relevant operators and delete left bracket, append postfixResult
            let bracketOperators = stack.splice(stack.indexOf("("), stack.length - 1);
            bracketOperators.shift();
            return [...postfixResult, ...bracketOperators];
        };
        this.convertInfixToPostfix = (calcArray) => {
            //opStack acts as a stack, the end is the top, and the start is the bottom (lifo)
            let postfixResult = [];
            const opStack = [];
            let bracketOpen = false;
            if (calcArray)
                for (let i = 0; i < calcArray.length; i++) {
                    let c = calcArray[i];
                    let temp = parseInt(c);
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
                    if (this.isOperator(c) &&
                        bracketOpen &&
                        !this.precedenceSameOrHigher(opStack, c)) {
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
        this.runOperation = (operator, base, newnum) => {
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
        this.regexNumsAndOps = /\d+|[\(\)\+\-\*\//]+/g;
        this.regexOps = /[\(\)\+\-\*\//]+/g;
    }
    runPostfixOperations(postfixArray) {
        //any is not recommended but type string | number returns errors - come back to this!
        let stack = [];
        for (let i = 0; i < postfixArray.length; i++) {
            //any is not recommended but type string | number returns errors - come back to this!
            let c = postfixArray[i];
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
exports.default = Calculator;
//# sourceMappingURL=calculator.js.map