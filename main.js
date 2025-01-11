let number1 = false;
let operatorSign = false;
let number2 = false;
let savedNumber1 = false;
let lastClickWasDigit = false;
let lastClickWasOperator = false;
let firstClickHappened = false;
let firstNumber = true;
let everythingCleared = true;
let equalsClicked = false;
let decimalClicked = false;
let percentageClicked = false;

let lastButtonClicked = document.getElementById("clearButton");
let screenText = document.getElementById("screenText");
let numberButtons = document.getElementsByClassName("numberButton");
let functionButtons = document.getElementsByClassName("functionButton");
let clearButton = document.getElementById("clearButton");
let equalsButton = document.getElementById("equalsButton");
let decimalButton = document.getElementById("decimalButton");
let percentageButton = document.getElementById("percentageButton");
let plusMinusButton = document.getElementById("plusMinusButton");
let backspaceButton = document.getElementById("backspaceButton");

document.addEventListener("keyup", keyPressed);
Array.from(numberButtons).forEach(item => item.addEventListener("click", numberButtonClicked));
Array.from(functionButtons).forEach(item => item.addEventListener("click", functionButtonClicked));
equalsButton.addEventListener("click", equalsButtonClicked);
decimalButton.addEventListener("click", decimalButtonClicked);
percentageButton.addEventListener("click", percentageButtonClicked);
plusMinusButton.addEventListener("click", plusMinusButtonClicked);
backspaceButton.addEventListener("click", backspaceButtonClicked);
clearButton.addEventListener("click", () => {
    screenText.textContent = "";
    lastClickWasDigit = false;
    lastClickWasOperator = false;
    equalsClicked = false;
    decimalClicked = false;
    percentageClicked = false;
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
    if (lastClickWasOperator && decimalClicked) {
        screenText.textContent = "0.";
    } else if (lastClickWasOperator) {
        screenText.textContent = "";
        percentageClicked = false;
    }
    

    if (equalsClicked && !decimalClicked && !percentageClicked) {
        screenText.textContent = "";
        firstNumber = true;
        number1 = false;
        operatorSign = false;
        number2 = false;
        everythingCleared = true;
        screenText.textContent += digit.target.textContent;
        lastClickWasDigit = true;
        lastClickWasOperator = false;
        decimalClicked = false;
        percentageClicked = false;
        firstClickHappened = true;
        equalsClicked = false;
    } else if (screenText.clientWidth < 345 && everythingCleared ) {    
        screenText.textContent += digit.target.textContent;
        lastClickWasDigit = true;
        lastClickWasOperator = false;
        decimalClicked = false;
        firstClickHappened = true;
        lastButtonClicked.removeAttribute("style");
    }

    if (screenText.textContent.includes(".")) {
        decimalClicked = true;
    }
}

function functionButtonClicked(operator) {
    if (lastClickWasOperator && !equalsClicked) {
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
                percentageClicked = false;
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
                equalsClicked = false;
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
                percentageClicked = false;
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
        decimalClicked = false;
        equalsClicked = false;
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
        equalsClicked = true;
        percentageClicked = false;
        decimalClicked = false;

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
            equalsClicked = false;
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
            equalsClicked = false;
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
            equalsClicked = false;
            number1 = false;
            operatorSign = false;
            number2 = false;
            firstClickHappened = false;
            everythingCleared = false;
        }
    }
}

function decimalButtonClicked() {
    if (screenText.textContent.charAt(0) == "" || lastClickWasOperator) {
        screenText.textContent = "0.";
        lastButtonClicked.removeAttribute("style");
        percentageClicked = false;
        decimalClicked = true;
    }

    if (!screenText.textContent.includes(".") && firstClickHappened) {
        screenText.textContent += ".";
        decimalClicked = true;
    }
}

function percentageButtonClicked() {
    if (!percentageClicked && screenText.textContent !== "0." && !lastClickWasOperator) {
        screenText.textContent = Number(screenText.textContent) / 100;
        percentageClicked = true;
    }

    if (number1 < 0) {
        let numDigitsWidth = screenText.clientWidth - 41;
        let amountOfDigits = Math.floor(numDigitsWidth / 35);

        if (amountOfDigits > 10) {
            let savedNumber = Number(screenText.textContent);
            let numberRounded = Math.floor(savedNumber);
            let amountOfDigitsBeforeDecimal = numberRounded.toString().length;
            let multiplier = 10 ** (9 - amountOfDigitsBeforeDecimal + 1);
            screenText.textContent = Math.round((savedNumber + Number.EPSILON) * multiplier) / multiplier;
        }
    } else {
        let numDigitsWidth = screenText.clientWidth - 18;
        let amountOfDigits = Math.floor(numDigitsWidth / 35);

        if (amountOfDigits > 10) {
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
        equalsClicked = false;
        firstNumber = true;
        number1 = false;
        operatorSign = false;
        number2 = false;
        firstClickHappened = false;
        everythingCleared = false;
    }
}

function plusMinusButtonClicked() {
    if (!lastClickWasOperator && screenText.textContent !== "0" && firstClickHappened) {
        if (Number(screenText.textContent) > 0) {
            screenText.textContent = Number(screenText.textContent) * -1;

            if (screenText.clientWidth > 360) {
                let numDigitsWidth = screenText.clientWidth - 41;
                let amountOfDigits = Math.floor(numDigitsWidth / 35);
            
                    if (amountOfDigits > 9) {
                        let savedNumber = Number(screenText.textContent);
                        let numberRounded = Math.floor(savedNumber);
                        let amountOfDigitsBeforeDecimal = numberRounded.toString().length;
                        let multiplier = 10 ** (9 - amountOfDigitsBeforeDecimal + 1);
                        screenText.textContent = Math.round((savedNumber + Number.EPSILON) * multiplier) / multiplier;
                    }
            }
        } else  {
            screenText.textContent = Number(screenText.textContent) * -1;
        }
    }
}

function backspaceButtonClicked() {
    if (firstClickHappened && !lastClickWasOperator) {
        screenText.textContent = screenText.textContent.slice(0, screenText.textContent.length - 1);
        percentageClicked = false;
    }

    if (!screenText.textContent.includes(".")) {
        decimalClicked = false;
    }

    if (screenText.textContent === "") {
        lastClickWasDigit = false;
        lastClickWasOperator = false;
        equalsClicked = false;
        decimalClicked = false;
        percentageClicked = false;
        firstNumber = true;
        number1 = false;
        operatorSign = false;
        number2 = false;
        savedNumber1 = false;
        everythingCleared = true;
        firstClickHappened = false;
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

function keyPressed(key) {
    if (key.code === `Digit${key.key}` || key.code === `Numpad${key.key}`) {
        let digitClickEvent = new Event("click");
        document.getElementById(`numberButton${key.key}`).dispatchEvent(digitClickEvent);
    }

    if (key.code === "NumpadMultiply" || key.code === "NumpadDivide" || key.code === "NumpadAdd" || key.code === "NumpadSubtract") {
        let operatorClickEvent = new Event("click");
        document.getElementById(`functionButton${key.key}`).dispatchEvent(operatorClickEvent);
    }

    if (key.code === "Equal") {
        let equalsClickEvent = new Event("click");
        equalsButton.dispatchEvent(equalsClickEvent);
    }

    if (key.code === "Period") {
        let decimalClickEvent = new Event("click");
        decimalButton.dispatchEvent(decimalClickEvent);
    }

    if (key.code === "Backspace") {
        let backspaceClickEvent = new Event("click");
        backspaceButton.dispatchEvent(backspaceClickEvent);
    }
}