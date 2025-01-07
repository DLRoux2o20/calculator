let number1 = false;
let operatorSign = false;
let number2 = false;
let savedNumber1 = false;
let lastClickWasDigit = false;
let lastClickWasOperator = false;
let firstClickHappened = false;
let firstNumber = true;
let everythingCleared = true;
let lastClickWasEquals = false;
let lastClickWasDecimal = false;
let lastClickWasPercentage = false;

let lastButtonClicked = document.getElementById("clearButton");
let screenText = document.getElementById("screenText");
let numberButtons = document.getElementsByClassName("numberButton");
let functionButtons = document.getElementsByClassName("functionButton");
let clearButton = document.getElementById("clearButton");
let equalsButton = document.getElementById("equalsButton");
let decimalButton = document.getElementById("decimalButton");
let percentageButton = document.getElementById("percentageButton");

Array.from(numberButtons).forEach(item => item.addEventListener("click", numberButtonClicked));
Array.from(functionButtons).forEach(item => item.addEventListener("click", functionButtonClicked));
equalsButton.addEventListener("click", equalsButtonClicked);
decimalButton.addEventListener("click", decimalButtonClicked);
percentageButton.addEventListener("click", percentageButtonClicked);
clearButton.addEventListener("click", () => {
    screenText.textContent = "";
    lastClickWasDigit = false;
    lastClickWasOperator = false;
    lastClickWasEquals = false;
    lastClickWasDecimal = false;
    lastClickWasPercentage = false;
    firstNumber = true;
    number1 = false;
    operatorSign = false;
    number2 = false;
    savedNumber1 = false;
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
    if (lastClickWasOperator && lastClickWasDecimal) {
        screenText.textContent = "0.";
    } else if (lastClickWasOperator) {
        screenText.textContent = "";
    }

    if (screenText.clientWidth < 345 && everythingCleared) {    
        screenText.textContent += digit.target.textContent;
        lastClickWasDigit = true;
        lastClickWasOperator = false;
        lastClickWasDecimal = false;
        lastClickWasPercentage = false;
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
        lastClickWasDecimal = false;
        lastClickWasPercentage = false;
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
                if (number1 < 0) {
                    let numDigitsWidth = screenText.clientWidth - 41;
                    let amountOfDigits = Math.floor(numDigitsWidth / 35);
    
                    if (amountOfDigits > 9) {
                        savedNumber1 = number1;
                        let number1Rounded = Math.floor(savedNumber1);
                        let amountOfDigitsBeforeDecimal = number1Rounded.toString().length;
                        let multiplier = 10 ** (9 - amountOfDigitsBeforeDecimal + 1);
                        screenText.textContent = Math.round((savedNumber1 + Number.EPSILON) * multiplier) / multiplier;
                    }
                } else {
                    let numDigitsWidth = screenText.clientWidth - 18;
                    let amountOfDigits = Math.floor(numDigitsWidth / 35);
    
                    if (amountOfDigits > 9) {
                        savedNumber1 = number1;
                        let number1Rounded = Math.floor(savedNumber1);
                        let amountOfDigitsBeforeDecimal = number1Rounded.toString().length;
                        let multiplier = 10 ** (9 - amountOfDigitsBeforeDecimal);
                        screenText.textContent = Math.round((savedNumber1 + Number.EPSILON) * multiplier) / multiplier;
                    }
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
                lastClickWasPercentage = false;
                number1 = false;
                operatorSign = false;
                number2 = false;
                firstClickHappened = false;
                everythingCleared = false;
            }

            if (screenText.textContent.includes("e")) {
                screenText.textContent = "";
                let tooSmallSpan = document.createElement("span");
                screenText.appendChild(tooSmallSpan);
                tooSmallSpan.style.display = "inline";
                tooSmallSpan.style.fontSize = "55px";
                tooSmallSpan.textContent = "TOO SMALL!";
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
                lastClickWasPercentage = false;
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
        lastClickWasDecimal = false;
        lastClickWasEquals = false;
        lastClickWasPercentage = false;
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
        lastClickWasPercentage = false;

        if (!Number.isInteger(number1)) {
            if (number1 < 0) {
                let numDigitsWidth = screenText.clientWidth - 41;
                let amountOfDigits = Math.floor(numDigitsWidth / 35);

                if (amountOfDigits > 9) {
                    savedNumber1 = number1;
                    let number1Rounded = Math.floor(savedNumber1);
                    let amountOfDigitsBeforeDecimal = number1Rounded.toString().length;
                    let multiplier = 10 ** (9 - amountOfDigitsBeforeDecimal + 1);
                    screenText.textContent = Math.round((savedNumber1 + Number.EPSILON) * multiplier) / multiplier;
                }
            } else {
                let numDigitsWidth = screenText.clientWidth - 18;
                let amountOfDigits = Math.floor(numDigitsWidth / 35);

                if (amountOfDigits > 9) {
                    savedNumber1 = number1;
                    let number1Rounded = Math.floor(savedNumber1);
                    let amountOfDigitsBeforeDecimal = number1Rounded.toString().length;
                    let multiplier = 10 ** (9 - amountOfDigitsBeforeDecimal);
                    screenText.textContent = Math.round((savedNumber1 + Number.EPSILON) * multiplier) / multiplier;
                }
            }
        }

        if (screenText.clientWidth > 360) {
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

        if (screenText.textContent.includes("e")) {
            screenText.textContent = "";
            let tooSmallSpan = document.createElement("span");
            screenText.appendChild(tooSmallSpan);
            tooSmallSpan.style.display = "inline";
            tooSmallSpan.style.fontSize = "55px";
            tooSmallSpan.textContent = "TOO SMALL!";
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

function decimalButtonClicked() {
    lastClickWasDecimal = true;

    if (screenText.textContent.charAt(0) == "" || lastClickWasOperator) {
        screenText.textContent = "0.";
        lastButtonClicked.removeAttribute("style");
    }

    if (!screenText.textContent.includes(".") && firstClickHappened) {
        screenText.textContent += ".";
    } else {
        lastClickWasDecimal = false;
    }

    lastClickWasPercentage = false;
}

function percentageButtonClicked() {
    if ((lastClickWasDigit || lastClickWasEquals) && !lastClickWasPercentage && !lastClickWasDecimal) {
        screenText.textContent = Number(screenText.textContent) / 100;
    }

    if (number1 < 0) {
        let numDigitsWidth = screenText.clientWidth - 41;
        let amountOfDigits = Math.floor(numDigitsWidth / 35);

        if (amountOfDigits > 9) {
            let savedNumber = Number(screenText.textContent);
            let numberRounded = Math.floor(savedNumber);
            let amountOfDigitsBeforeDecimal = numberRounded.toString().length;
            let multiplier = 10 ** (9 - amountOfDigitsBeforeDecimal + 1);
            screenText.textContent = Math.round((savedNumber + Number.EPSILON) * multiplier) / multiplier;
        }
    } else {
        let numDigitsWidth = screenText.clientWidth - 18;
        let amountOfDigits = Math.floor(numDigitsWidth / 35);

        if (amountOfDigits > 9) {
            let savedNumber = Number(screenText.textContent);
            let numberRounded = Math.floor(savedNumber);
            let amountOfDigitsBeforeDecimal = numberRounded.toString().length;
            let multiplier = 10 ** (9 - amountOfDigitsBeforeDecimal);
            screenText.textContent = Math.round((savedNumber + Number.EPSILON) * multiplier) / multiplier;
        }
    }

    if (screenText.textContent.includes("e")) {
        screenText.textContent = "";
        let tooSmallSpan = document.createElement("span");
        screenText.appendChild(tooSmallSpan);
        tooSmallSpan.style.display = "inline";
        tooSmallSpan.style.fontSize = "55px";
        tooSmallSpan.textContent = "TOO SMALL!";
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

    lastClickWasPercentage = true;
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