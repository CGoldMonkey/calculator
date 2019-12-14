const buttons = document.querySelectorAll(".buttonContainer button");
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
    button.addEventListener('click', callCalculator)})
    
function callCalculator() {
    let input = this.textContent;

    if (input !== '⌫') {
        appendDisplay(input);
    }
    //if operator then save the number and operator
    if (operators.test(input)) { 
        mathExpression.push({ number: currentNumber, operator: input });
        currentNumber = "";
    } else if (input === "AC") {
        clearDisplay();
    } else if (input === "⌫") {
        backspaceExpression();
        backspaceDisplay();
    } else if (input === "=") {
        mathExpression.push({ number: currentNumber });
        //call operate on the numbers: *and / operater, then + -
        evaluateExpression: {
            while (mathExpression.some(checkMultiplyDivide)) {
                let multOrDivideIndex = mathExpression.findIndex(checkMultiplyDivide);
                let sum = sumOfSubExpression(multOrDivideIndex);
                if (divideByZero === true) {
                    break evaluateExpression;
                }
                updateMathExpression(sum, multOrDivideIndex);
            }
            while (mathExpression.length > 1) {
                let beginningIndex = 0;
                let sum = sumOfSubExpression(beginningIndex);
                updateMathExpression(sum, beginningIndex);
            }
            dispayFinalNumber();
        }
    } else {
        currentNumber += input;
    }
    checkForDecimal(currentNumber.toString()); 
} 

function dispayFinalNumber() {
    mathExpression[0].number = roundToThousandths(mathExpression[0].number);
    currentNumber = mathExpression[0].number;
    display.textContent = currentNumber;
    mathExpression = [];
}

function backspaceExpression() {
    currentNumber = currentNumber.toString();
    if(currentNumber.length > 0) { //if current number isn't empty then bacspace current number
        currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    } else if (mathExpression.length !== 0) {
        //if operator isn't empty delete that
        let lastIndex = mathExpression.length - 1;
        //check operator and delete it
        currentNumber = mathExpression[lastIndex].number;
        mathExpression.pop();
    } 
}

function backspaceDisplay(){
    displayLength = display.textContent.length;
    display.textContent = display.textContent.slice(0, displayLength - 1);
}

function checkForDecimal(number) {
    if (number.includes(".")) {
        decimalButton.disabled = true;
    } else {
        decimalButton.disabled = false;
    }
}

function divisionByZero() {
    display.textContent = "Can't divide by 0, CLEAR display!";
    divideByZero = true;
}

function clearDisplay() {
    display.textContent = "";
    currentNumber = "";
    mathExpression = [];
    divideByZero = false;
    decimalButton.disabled = false;
}

function roundToThousandths(number) {
    return Math.round(number * 1000) / 1000;
}

function sumOfSubExpression(index) {
    let current = mathExpression[index];
    let second = mathExpression[index + 1];
    if (current.operator == '÷' && second.number == 0) {
        divisionByZero();
    }
    let sum = operate(current.number, current.operator, second.number);
    return sum;
}

function updateMathExpression(newNumber, currentIndex) {
    mathExpression[currentIndex + 1].number = newNumber;

    mathExpression = [...mathExpression.slice(0, currentIndex),
    ...mathExpression.slice(currentIndex + 1)];
}

function checkMultiplyDivide(expressionObj) {
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

function divide(a, b) {
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

   /* button.addEventListener('click', (e) => {
        let input = button.textContent;

        console.log("Beginning CurNum: " + currentNumber);

        if (input !== '⌫') {
            appendDisplay(input);
        }
        //if operator then save the number and operator
        if (operators.test(input)) {
            mathExpression.push({ number: currentNumber, operator: input });
            currentNumber = "";
            decimalButton.disabled = false;
        } else if (input === "AC") {
            clearDisplay();
        } else if (input === "⌫") {
            //CHANGE EXPRESSION
            console.log("In Backspace");
            currentNumber = currentNumber.toString();
            if(currentNumber.length > 0) { //if current number isn't empty then bacspace current number
                currentNumber = currentNumber.slice(0, currentNumber.length - 1);
                console.log("Changing current Num Backspace: "+currentNumber);
            } else if (mathExpression.length !== 0) {
                //if operator isn't empty delete that
                let lastIndex = mathExpression.length - 1;
                //check operator and delete it
                currentNumber = mathExpression[lastIndex].number;
                mathExpression.pop();
                console.table(mathExpression);
            } 
            //CHANGE DISPLAY
            backspaceDisplay();
            checkForDecimal(currentNumber.toString());
            console.log("Current Number after Backspace: "+currentNumber);

        } else if (input === "=") {
            mathExpression.push({ number: currentNumber });

            //call operate on the numbers: *and / operater, then + -
            evaluateExpression: {
                while (mathExpression.some(checkMultiplyDivide)) {
                    let multOrDivideIndex = mathExpression.findIndex(checkMultiplyDivide);
                    let sum = sumOfNumbersToRight(multOrDivideIndex);
                    if (divideByZero === true) {
                        break evaluateExpression;
                    }
                    updateMathExpression(sum, multOrDivideIndex);
                    console.table(mathExpression);
                }
                while (mathExpression.length > 1) {
                    let beginningIndex = 0;
                    let sum = sumOfNumbersToRight(beginningIndex);
                    updateMathExpression(sum, beginningIndex);
                    console.table(mathExpression);
                }
                //dispay final number
                mathExpression[0].number = roundToThousandths(mathExpression[0].number);
                currentNumber = mathExpression[0].number;
                display.textContent = currentNumber;
                checkForDecimal(currentNumber.toString());
                mathExpression = [];
            }
        } else { //done here so that the operators or the = string aren't added to the number
            currentNumber += input;
            console.log("Current Num: " + currentNumber);
            checkForDecimal(currentNumber);
        }
        console.table(mathExpression);
    })
}) */