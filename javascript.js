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
        this.operandInput = "";
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
        console.log("OpLeft: " + this.operandLeft + " OpRight: " + this.operandRight + " Result: " + this.result);
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

const numButtonHandler = function (e) {
    calc.operandInput += e.currentTarget.innerText;
    calc.displayValue = calc.operandInput;
    calc.updateDisplay();
}

const opButtonHandler = function (e) {
    if (calc.operandLeft === "") {
        calc.operandLeft = calc.operandInput;
    }
    else if (calc.operandRight === "") {
        calc.operandRight = calc.operandInput;
    }
    
    calc.operandInput = "";

    const operator = e.currentTarget.innerText;
    if (calc.operator === "") {
        calc.operator = operator;
    }
    else {
        calc.operate();
        calc.operator = operator;
        calc.operandLeft = calc.result.toString();
        calc.operandRight = "";
    }
}

const eqButtonHandler = function (e) {
    if (calc.operandLeft === "") {
        calc.operandLeft = calc.operandInput;
    }
    else if (calc.operandRight === "") {
        calc.operandRight = calc.operandInput;
    }

    calc.operandInput = "";

    if ((calc.operandLeft !== "") && (calc.operandRight !== "")) {
        const temp = calc.operandRight;
        calc.operate();
        calc.operandLeft = calc.result.toString();
        calc.operandRight = temp;
    }
}

const clrButtonHandler = function (e) {
    calc.clear();
}

const plusMinusButtonHandler = function (e) {
    calc.invertInput();
}

/** @type {HTMLButtonElement | null} */
const clearButton = document.querySelector("#clear");
clearButton?.addEventListener("click", clrButtonHandler);

/** @type {HTMLButtonElement | null} */
const eqButton = document.querySelector("#equals");
eqButton?.addEventListener("click", eqButtonHandler);

/** @type {NodeListOf<HTMLButtonElement>} */
const numButtons = document.querySelectorAll(".number");
numButtons.forEach(button => { button.addEventListener("click", numButtonHandler) });

/** @type {NodeListOf<HTMLButtonElement>} */
const opButtons = document.querySelectorAll(".operator");
opButtons.forEach(button => { button.addEventListener("click", opButtonHandler) });

/** @type {HTMLButtonElement | null} */
const plusMinusButton = document.querySelector("#plusMinus");
plusMinusButton?.addEventListener("click", plusMinusButtonHandler);

/** @type {HTMLDivElement | null} */
const display = document.querySelector("#display");

document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (Number.isInteger(+key) || key === ".") {
        numButtons.forEach((button) => { if (button.innerText === key) button.click(); });
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        opButtons.forEach((button) => { if (button.innerText === key) button.click(); });
    } else if (key === "=" || key === "Enter") {
        eqButton?.click();
    } else if (key === "Escape") {
        clearButton?.click();
    }
});

const calc = new Calculator();
