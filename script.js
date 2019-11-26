const buttons = document.querySelectorAll(".container button");
const display = document.querySelector("#display");
let mathExpression = [];
const operators = /\+|-|x|÷/;
let currentNumber = "";

//const equals = document.querySelector("#equals");
//const operators = document.querySelectorAll(".operators");
//display.textContent = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
  //      console.log(button);
        let input = button.textContent;
        
         //if operator then save the number and operator
        if(operators.test(input)){
            mathExpression.push({number: currentNumber, operator: input});
            currentNumber = "";
        } else if(input === "=") {
            mathExpression.push({number: currentNumber});
            currentNumber = "";

     //       console.table(mathExpression);

            //call operate on the numbers: *and / operater, then + -
        //    let sum = mathExpression
            while(mathExpression.some(checkMultiplyDivide)) {
         /*   if(mathExpression.some(expression => {
                return expression.operator === "x" || expression.operator === "÷"})) {
                console.log("x or divide after =");
            }   */   
          //      console.log("x or divide after =");
                //look for * or divide

         /*       let multOrDivideIndex = mathExpression.findIndex(checkMultiplyDivide);
                let first = mathExpression[multOrDivideIndex];
                let second = mathExpression[multOrDivideIndex+1];
                let sumElements = operate(first.number, first.operator, second.number);
                console.log(sumElements);

                //assign the updated sum to the one to the right of it
                second.number = sumElements;
                console.log(mathExpression[multOrDivideIndex+1].number);

                //delete the current object// or make new array
                mathExpression = [...mathExpression.slice(0, multOrDivideIndex),
                        ...mathExpression.slice(multOrDivideIndex+1)];
                console.table(mathExpression);
                */
               let multOrDivideIndex = mathExpression.findIndex(checkMultiplyDivide);
               let sum = sumOfNumbersToRight(multOrDivideIndex);
               updateMathExpression(sum, multOrDivideIndex);

            }

            //if ther isn't any multiply or divide
          //  let currentIndex = 0;

            while(mathExpression.length !== 1) {
                let currentIndex = 0;
                let curFirst = mathExpression[currentIndex];
                let curSecond = mathExpression[currentIndex + 1];
                let curSum = operate(curFirst.number, curFirst.operator, curSecond.number);

                curSecond.number = curSum;

                mathExpression = [...mathExpression.slice(0, currentIndex),
                    ...mathExpression.slice(currentIndex+1)];

                    console.table(mathExpression);

                curSum = 0;
            }

            //dispay final number
            appendDisplay(mathExpression[0].number)

        } else {
            currentNumber += input;
        }
        appendDisplay(button.textContent);
  //      console.log("currentNumber: "+currentNumber);
        console.table(mathExpression);

    })
})

function sumOfNumbersToRight (index) {
    let current = mathExpression[index];
    let second = mathExpression[index + 1];
    let sum = operate(current.number, current.operator, second.number);

    return sum;

 /*   let multOrDivideIndex = mathExpression.findIndex(checkMultiplyDivide);
                let first = mathExpression[multOrDivideIndex];
                let second = mathExpression[multOrDivideIndex+1];
                let sumElements = operate(first.number, first.operator, second.number);
                console.log(sumElements);

                //assign the updated sum to the one to the right of it
                second.number = sumElements;
                console.log(mathExpression[multOrDivideIndex+1].number);

                //delete the current object// or make new array
                mathExpression = [...mathExpression.slice(0, multOrDivideIndex),
                        ...mathExpression.slice(multOrDivideIndex+1)];
                console.table(mathExpression);
                */
            

}

function updateMathExpression(newNumber, currentIndex) {
    mathExpression[currentIndex+1].number = newNumber;

    mathExpression = [...mathExpression.slice(0, currentIndex), 
            ...mathExpression.slice(currentIndex+1)];
}

function checkMultiplyDivide(expressionObj){
    return expressionObj.operator === "x" || expressionObj.operator === "÷"
}

function appendDisplay(anotherValue) {
    let orginialValue = display.textContent;
    display.textContent = orginialValue + anotherValue;
}

function getDisplayValue() {
    
}

function setCurrentNumber() {

}

function checkForOperator(input){
 //   if(input is operator){
 //       let previousValue = 
//    }
      
}

//let displayValue = 

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(first, operator, second) {
    let result;
    switch (operator) {
        case '+':
            result = add(first, second);
            break;
        case '-':
            result = subtract(first, second);
            break;
        case 'x':
            result = multiply(first, second);
            break;
        case '÷':
            result = divide(first, second);
            break;
        default:
            result = "That operator is not recongnized, please try again.";
            break;
    }
    return result;
}