const buttons = document.querySelectorAll(".container button");
const display = document.querySelector("#display");
const mathExpression = [];
const operators = /\+|-|x|÷/;
let currentNumber = "";

//const equals = document.querySelector("#equals");
//const operators = document.querySelectorAll(".operators");
//display.textContent = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(button);
        let input = button.textContent;
        
         //if operator then save the number and operator
         if(operators.test(input)){
            mathExpression.push({number: currentNumber, operator: input});
            currentNumber = "";
        } else if(input === "=") {
            mathExpression.push({number: currentNumber});
            currentNumber = "";

            //call operate on the numbers: *and / operater, then + -
        //    let sum = mathExpression
            if(mathExpression.some(checkMultiplyDivide)) {
         /*   if(mathExpression.some(expression => {
                return expression.operator === "x" || expression.operator === "÷"})) {
                console.log("x or divide after =");
            }   */   
                console.log("x or divide after =");
            }

        } else {
            currentNumber += input;
        }
        appendDisplay(button.textContent);
        console.log("currentNumber: "+currentNumber);
        console.table(mathExpression);

    })
})

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