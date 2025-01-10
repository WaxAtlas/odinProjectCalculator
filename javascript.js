// @ts-check

let operand = "";
let operandLeft = null;
let operandRight = null;
let operatorFirst = null;
let displayValue = "0";
let result = null;

/** @type {NodeListOf<HTMLButtonElement>} */
const buttons = document.querySelectorAll("button");

/** @type {HTMLDivElement | null} */
const display = document.querySelector("#display");

const add = function (x, y) {
    return (x + y);
};

const subtract = function (x, y) {
    return (x - y);
};

const multiply = function (x, y) {
    return (x * y);
};

const divide = function (x, y) {
    return (x / y);
};

const equals = function () {
    if (operandLeft === null) {
        operandLeft = parseFloat(operand);
    }
    else if (operandRight === null) {
        operandRight = parseFloat(operand);
    }

    operand = "";

    if ((operandLeft !== null) && (operandRight !== null)) {
        const temp = operandRight;
        operate();
        operandRight = temp;
    }
}

const updateDisplay = function () {
    /** ugly but it gets us a rounded number with exponential notation */
    if (displayValue.length > 9) {
        displayValue = parseFloat(parseFloat(displayValue).toFixed(9)).toExponential();
    }

    if (display) {
        display.textContent = displayValue;
    }
}

const updateOperand = function (e) {
    operand += e.currentTarget.textContent;
    displayValue = operand;
    updateDisplay();
}

const updateOperator = function (e) {
    if (operandLeft === null) {
        operandLeft = parseFloat(operand);
    }
    else if (operandRight === null) {
        operandRight = parseFloat(operand);
    }

    operand = "";

    const operator = e.currentTarget.textContent;
    if (!operatorFirst) {
        operatorFirst = operator;
    }
    else {
        operate();
        operatorFirst = operator
    }
}

const operate = function () {
    if (operatorFirst === "+") {
        result = add(operandLeft, operandRight);
    }
    if (operatorFirst === "-") {
        result = subtract(operandLeft, operandRight);
    }
    if (operatorFirst === "*") {
        result = multiply(operandLeft, operandRight);
    }
    if (operatorFirst === "/") {
        result = divide(operandLeft, operandRight);
    }

    operandLeft = result;
    operandRight = null;

    displayValue = result.toString();
    updateDisplay();
    console.log(result);
}

const invert = function () {
    if (displayValue.includes("-")) {
        operand = operand.substring(1);
    }
    else {
        operand = "-" + operand;
    }
    displayValue = operand;
    updateDisplay();
}

const clear = function () {
    operand = "";
    operandLeft = null;
    operandRight = null;
    operatorFirst = null;
    result = null;
    displayValue = "0";
    updateDisplay();
}

buttons.forEach(button => {
    if (button.className === "operator" && button.id !== "equals") {
        button.addEventListener("click", updateOperator, false);
    }
    if (button.className === "number") {
        button.addEventListener("click", updateOperand, false);
    }
    if (button.id === "clear") {
        button.addEventListener("click", clear);
    }
    if (button.id === "equals") {
        button.addEventListener("click", equals);
    }
    if (button.id === "plusMinus") {
        button.addEventListener("click", invert);
    }
});
