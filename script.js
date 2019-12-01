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
        let input = button.textContent;
        appendDisplay(input);
   
         //if operator then save the number and operator
        if(operators.test(input)){
            mathExpression.push({number: currentNumber, operator: input});
            currentNumber = "";
        } else if(input === "CLEAR") {
            clearDisplay();
        } else if(input === "=") {
            mathExpression.push({number: currentNumber});
        //    currentNumber = "";
           //call operate on the numbers: *and / operater, then + -
            while(mathExpression.some(checkMultiplyDivide)) {
               let multOrDivideIndex = mathExpression.findIndex(checkMultiplyDivide);
               let sum = sumOfNumbersToRight(multOrDivideIndex);
               updateMathExpression(sum, multOrDivideIndex);
               console.table(mathExpression);
            }
            while(mathExpression.length > 1) {
                let beginningIndex = 0;
                let sum = sumOfNumbersToRight(beginningIndex);
                updateMathExpression(sum, beginningIndex);
                console.table(mathExpression);
            }
            //dispay final number
            mathExpression[0].number = roundToThousandths(mathExpression[0].number);
            let finalNumber = mathExpression[0].number;
            appendDisplay(finalNumber)
            currentNumber = finalNumber;
            mathExpression = [];

        } else {
            currentNumber += input;
        }
        console.table(mathExpression);
    })
})

function clearDisplay() {
    display.textContent = "";
    currentNumber = "";
    mathExpression = [];
}

function roundToThousandths(number){
    return Math.round(number*1000)/1000;
}

function sumOfNumbersToRight(index) {
    let current = mathExpression[index];
    let second = mathExpression[index + 1];
    let sum = operate(current.number, current.operator, second.number);
    return sum;
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
    display.textContent += anotherValue;
}

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
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