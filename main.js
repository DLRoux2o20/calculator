let number1 = 3;
let operatorTest = "+";
let number2 = 5;
let screenText = document.getElementById("screenText");
let lastClickWasDigit = false;
let lastClickWasOperator = false;
let firstClickHappened = false;
let lastButtonClicked = document.getElementById("clearButton");

let numberButtons = document.getElementsByClassName("numberButton");
let functionButtons = document.getElementsByClassName("functionButton");

Array.from(numberButtons).forEach(item => item.addEventListener("click", numberButtonClicked));
Array.from(functionButtons).forEach(item => item.addEventListener("click", functionButtonClicked));

function numberButtonClicked(digit) {
    if (lastClickWasOperator === true) {
        screenText.textContent = "";
    }

    if (screenText.clientWidth < 345) {    
        screenText.textContent += digit.target.textContent;
        lastClickWasDigit = true;
        lastClickWasOperator = false;
        firstClickHappened = true;
        lastButtonClicked.removeAttribute("style");
        console.log(screenText.clientWidth);
    }
    
}

function functionButtonClicked(operator) {
    if (lastClickWasDigit === false) {
        lastButtonClicked.removeAttribute("style");
    }

    if (firstClickHappened === true) {
        operator.target.style.cssText = "background-color: #fce2bb";
        lastButtonClicked = operator.target;
        lastClickWasDigit = false;
        lastClickWasOperator = true;
    }
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