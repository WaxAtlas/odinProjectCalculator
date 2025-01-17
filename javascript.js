// @ts-check

class Calculator {
    operandInput = "";
    operandLeft = "";
    operandRight = "";
    operator = "";
    displayValue = "0";
    result = 0;

    constructor() {
        this.clear();
    }

    clear() {
        this.operandInput = "0";
        this.operandLeft = "";
        this.operandRight = "";
        this.operator = "";
        this.result = 0;
        this.displayValue = "0";
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.displayValue.length > 9) {
            this.displayValue = parseFloat(parseFloat(this.displayValue).toFixed(9)).toExponential();
        }
    
        if (display) {
            display.textContent = this.displayValue;
        }
    }

    operate() {
        const a = parseFloat(this.operandLeft);
        const b = parseFloat(this.operandRight);

        switch(this.operator) {
            case "+":
                this.result = a + b;
                break;
            case "-":
                this.result = a - b;
                break;
            case "*":
                this.result = a * b;
                break;
            case "/":
                this.result = a / b;
                break;
            default:
                console.log("Error");
                break;
        }

        this.displayValue = this.result.toString();
        this.updateDisplay();
        console.log("Result: " + this.result);
    }

    invertInput() {
        if (this.displayValue.includes("-")) {
            this.operandInput = this.operandInput.substring(1);
        }
        else {
            this.operandInput = "-" + this.operandInput;
        }
        this.displayValue = this.operandInput;
        this.updateDisplay();
    }
}

/** @type {NodeListOf<HTMLButtonElement>} */
const buttons = document.querySelectorAll("button");

/** @type {HTMLDivElement | null} */
const display = document.querySelector("#display");

const equals = function () {
    if (operandLeft === null) {
        operandLeft = parseFloat(operandInput);
    }
    else if (operandRight === null) {
        operandRight = parseFloat(operandInput);
    }

    operandInput = "";

    if ((operandLeft !== null) && (operandRight !== null)) {
        const temp = operandRight;
        operate();
        operandRight = temp;
    }
}

const updateOperand = function (e) {
    operandInput += e.currentTarget.textContent;
    displayValue = operandInput;
    updateDisplay();
}

const updateOperator = function (e) {
    if (operandLeft === null) {
        operandLeft = parseFloat(operandInput);
    }
    else if (operandRight === null) {
        operandRight = parseFloat(operandInput);
    }

    operandInput = "";

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

buttons.forEach(button => {
    if (button.className === "operator" && button.id !== "equals") {
        button.addEventListener("click", updateOperator, false);
    }
    if (button.className === "number") {
        button.addEventListener("click", updateOperand, false);
    }
    if (button.id === "clear") {
        button.addEventListener("click", calc.clear);
    }
    if (button.id === "equals") {
        button.addEventListener("click", equals);
    }
    if (button.id === "plusMinus") {
        button.addEventListener("click", calc.invertInput);
    }
});

const calc = new Calculator();
