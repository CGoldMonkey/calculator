const buttons = document.querySelectorAll(".container button");
const display = document.querySelector("#display");
const decimalButton = document.querySelector("#decimal");
let mathExpression = [];
const operators = /\+|-|x|÷/;
let currentNumber = "";
let divideByZero = false;

//const equals = document.querySelector("#equals");
//const operators = document.querySelectorAll(".operators");
//display.textContent = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let input = button.textContent;

        console.log("Beginning CurNum: "+currentNumber);


        appendDisplay(input);
   
         //if operator then save the number and operator
        if(operators.test(input)){
            mathExpression.push({number: currentNumber, operator: input});
            currentNumber = "";
            decimalButton.disabled = false;
        } else if(input === "CLEAR") {
            clearDisplay();
        } else if(input === "=") {
            mathExpression.push({number: currentNumber});
        //    currentNumber = "";
           //call operate on the numbers: *and / operater, then + -
            evaluateExpression: {
                while(mathExpression.some(checkMultiplyDivide)) {
  //                  let divideByZero = false;
                    let multOrDivideIndex = mathExpression.findIndex(checkMultiplyDivide);
                    let sum = sumOfNumbersToRight(multOrDivideIndex);
                    if (divideByZero === true) {
                        break evaluateExpression;
                    }                    
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
                checkForDecimal(currentNumber.toString());
                mathExpression = [];
            }

        } else {
            currentNumber += input;
            console.log("Current Num: "+currentNumber);
            checkForDecimal(currentNumber);

            //problems with starting off with a decimal point
            //probably better to make function of our own
    /*        if(currentNumber.includes(".")){
                decimalButton.disabled = true;
            } else {
                decimalButton.disabled = false;
            }*/
        }
        console.table(mathExpression);
    })
})

function checkForDecimal(number) {
    if(number.includes(".")) {
        decimalButton.disabled = true;
    } else {
        decimalButton.disabled = false;
    }
}

function divisionByZero() {
    display.textContent = "Can't divide by 0, CLEAR display to try again!!!";
    divideByZero = true;
    
}

function clearDisplay() {
    display.textContent = "";
    currentNumber = "";
    mathExpression = [];
    divideByZero = false;
    decimalButton.disabled = false;
}

function roundToThousandths(number){
    return Math.round(number*1000)/1000;
}

function sumOfNumbersToRight(index) {
    let current = mathExpression[index];
    let second = mathExpression[index + 1];
    if(current.operator == '÷' && second.number == 0){
    //    clearDisplay();
        divisionByZero();
    }
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