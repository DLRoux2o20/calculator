import Decimal from '../decimal.js/decimal.mjs';

let number1 = false;
let operatorSign = false;
let number2 = false;
let lastClickWasDigit = false;
let lastClickWasOperator = false;
let firstClickHappened = false;
let firstNumber = true;
let everythingCleared = true;
let lastClickWasEquals = false;

let lastButtonClicked = document.getElementById("clearButton");
let screenText = document.getElementById("screenText");
let numberButtons = document.getElementsByClassName("numberButton");
let functionButtons = document.getElementsByClassName("functionButton");
let clearButton = document.getElementById("clearButton");
let equalsButton = document.getElementById("equalsButton");

Array.from(numberButtons).forEach(item => item.addEventListener("click", numberButtonClicked));
Array.from(functionButtons).forEach(item => item.addEventListener("click", functionButtonClicked));
equalsButton.addEventListener("click", equalsButtonClicked);
clearButton.addEventListener("click", () => {
    screenText.textContent = "";
    lastClickWasDigit = false;
    lastClickWasOperator = false;
    lastClickWasEquals = false;
    firstNumber = true;
    number1 = false;
    operatorSign = false;
    number2 = false;
    everythingCleared = true;

    if (screenText.hasChildNodes()) {
        screenText.removeChild(tooBigSpan);
    }

    if (firstClickHappened) {
        lastButtonClicked.removeAttribute("style");
    }
    firstClickHappened = false;
});

function numberButtonClicked(digit) {
    if (lastClickWasOperator) {
        screenText.textContent = "";
    }

    if (screenText.clientWidth < 345 && everythingCleared) {    
        screenText.textContent += digit.target.textContent;
        lastClickWasDigit = true;
        lastClickWasOperator = false;
        firstClickHappened = true;
        lastButtonClicked.removeAttribute("style");
    }

    if (lastClickWasEquals) {
        screenText.textContent = "";
        firstNumber = true;
        number1 = false;
        operatorSign = false;
        number2 = false;
        everythingCleared = true;
        screenText.textContent += digit.target.textContent;
        lastClickWasDigit = true;
        lastClickWasOperator = false;
        firstClickHappened = true;
        lastClickWasEquals = false;
    }
}

function functionButtonClicked(operator) {
    if (lastClickWasOperator && !lastClickWasEquals) {
        lastButtonClicked.removeAttribute("style");
    } else {
        if (firstNumber) {
            number1 = Number(screenText.textContent);
            firstNumber = false;
        } else {
            number2 = Number(screenText.textContent);
            firstNumber = true;
        }

        if (number1 !== false && operatorSign !== false && number2 !== false) {
            number1 = operate(number1, operatorSign, number2);
            screenText.textContent = number1;
            firstNumber = false;

            if (!Number.isInteger(number1)) {
                let numDigitsWidth = screenText.clientWidth - 17.5;
                let amountOfDigits = Math.floor(numDigitsWidth / 35);

                if (amountOfDigits > 9) {
                    let number1Rounded = Math.floor(number1);
                    let amountOfDigitsBeforeDecimal = number1Rounded.toString().length;
                    number1 = new Decimal(number1).toFixed(9 - amountOfDigitsBeforeDecimal);
                    number1 = Number(number1);
                    screenText.textContent = number1;
                }
            }

            if (screenText.clientWidth > 350 && Number.isInteger(number1)) {
                screenText.textContent = "";
                let tooBigSpan = document.createElement("span");
                screenText.appendChild(tooBigSpan);
                tooBigSpan.style.display = "inline";
                tooBigSpan.textContent = "TOO BIG!";
                lastClickWasDigit = false;
                lastClickWasOperator = false;
                number1 = false;
                operatorSign = false;
                number2 = false;
                firstClickHappened = false;
                everythingCleared = false;
            }

            if (screenText.textContent === "Infinity") {
                screenText.textContent = ";)";
                lastClickWasDigit = false;
                lastClickWasOperator = false;
                number1 = false;
                operatorSign = false;
                number2 = false;
                firstClickHappened = false;
                everythingCleared = false;
            }
        }
    }

    if (firstClickHappened) {
        operator.target.style.cssText = "background-color: #fce2bb";
        lastButtonClicked = operator.target;
        lastClickWasDigit = false;
        lastClickWasOperator = true;
        lastClickWasEquals = false;
        operatorSign = operator.target.textContent;
    }
}

function equalsButtonClicked() {
    if (number1 !== false && operatorSign !== false) {
        number2 = Number(screenText.textContent);
    }

    if (number1 !== false && operatorSign !== false && number2 !== false && lastClickWasDigit) {
        number1 = operate(number1, operatorSign, number2);
        screenText.textContent = number1;
        firstNumber = true;
        operatorSign = false;
        lastClickWasDigit = false;
        lastClickWasEquals = true;

        if (!Number.isInteger(number1)) {
            let numDigitsWidth = screenText.clientWidth - 17.5;
            let amountOfDigits = Math.floor(numDigitsWidth / 35);

            if (amountOfDigits > 9) {
                let number1Rounded = Math.floor(number1);
                let amountOfDigitsBeforeDecimal = number1Rounded.toString().length;
                number1 = new Decimal(number1).toFixed(9 - amountOfDigitsBeforeDecimal);
                number1 = Number(number1);
                screenText.textContent = number1;
            }
        }

        if (screenText.clientWidth > 350) {
            screenText.textContent = "";
            let tooBigSpan = document.createElement("span");
            screenText.appendChild(tooBigSpan);
            tooBigSpan.style.display = "inline";
            tooBigSpan.textContent = "TOO BIG!";
            lastClickWasDigit = false;
            lastClickWasOperator = false;
            lastClickWasEquals = false;
            firstNumber = true;
            number1 = false;
            operatorSign = false;
            number2 = false;
            firstClickHappened = false;
            everythingCleared = false;
        }

        if (screenText.textContent === "Infinity") {
            screenText.textContent = ";)";
            lastClickWasDigit = false;
            lastClickWasOperator = false;
            lastClickWasEquals = false;
            number1 = false;
            operatorSign = false;
            number2 = false;
            firstClickHappened = false;
            everythingCleared = false;
        }
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else {
        return divide(num1, num2);
    }
}