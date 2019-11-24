const buttons = document.querySelectorAll(".container button");
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");
const operators = document.querySelectorAll(".operators");
//display.textContent = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(e);
        appendDisplay(e.target.textContent);
    })
})

function appendDisplay(anotherValue) {
    let orginialValue = display.textContent;
    display.textContent = orginialValue + anotherValue;
}

function getDisplayValue(){
    
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

function operate(first, second, operator) {
    let result;
    switch (operator) {
        case '+':
            result = add(first, second);
            break;
        case '-':
            result = subtract(first, second);
            break;
        case '*':
            result = multiply(first, second);
            break;
        case '/':
            result = divide(first, second);
            break;
        default:
            result = "That operator is not recongnized, please try again.";
            break;
    }
    return result;
}