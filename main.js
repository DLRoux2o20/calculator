let number1 = 3;
let operatorTest = "+";
let number2 = 5;
let numberButtons = document.getElementsByClassName("numberButton");
let functionButtons = document.getElementsByClassName("functionButton");

let screenDigit1 = document.getElementById("screenDigit1");
let screenOperator = document.getElementById("screenOperator");
let screenDigit2 = document.getElementById("screenDigit2");

Array.from(numberButtons).forEach(item => item.addEventListener("click", numberButtonClicked));
Array.from(functionButtons).forEach(item => item.addEventListener("click", functionButtonClicked));

function numberButtonClicked(digit) {
   screenDigit1.textContent = screenDigit1.textContent + digit.target.textContent;
}

function functionButtonClicked(operator) {
    screenOperator.textContent = operator.target.textContent;
}

function add(num1, num2) {
    console.log(num1 + num2);
}

function subtract(num1, num2) {
    console.log(num1 - num2);
}

function multiply(num1, num2) {
    console.log(num1 * num2);
}

function divide(num1, num2) {
    console.log(num1 / num2);
}

function operate(num1, operatorTest, num2) {
    if (operatorTest === "+") {
        add(num1, num2);
    } else if (operatorTest === "*") {
        multiply(num1, num2);
    } else if (operatorTest === "-") {
        subtract(num1, num2);
    } else {
        divide(num1, num2);
    }
}

operate(number1, operatorTest, number2);