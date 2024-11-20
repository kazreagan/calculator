const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".btn");

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetDisplay = false;

//reset the calculator display and variables
function resetDisplay() {
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetDisplay = false;
}

//append a number to the display
function appendNumber(number) {
    if (display.textContent === "0" || shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent += number;
    }
}

//set the operator for the calculation
function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

//perform the calculation based on the operator
function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator === "/" && display.textContent === "0") {
        display.textContent = "Error: Cannot divide by 0!";
        resetDisplay();
        return;
    }
    secondOperand = display.textContent;
    display.textContent = roundResult(
        operate(currentOperator, firstOperand, secondOperand)
    );
    currentOperator = null;
}

//round results to 3 decimal places
function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

//handle the clear button
function handleClear() {
    resetDisplay();
}

//handle backspace (remove the last character)
function handleBackspace() {
    display.textContent = display.textContent.slice(0, -1) || "0";
}

//handle decimal point (ensure only one is added)
function handleDot() {
    if (display.textContent.includes(".")) return;
    display.textContent += ".";
}

//perform mathematical operations
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b !== 0 ? a / b : "Error";
        default:
            return null;
    }
}

//add event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("number")) {
            appendNumber(button.textContent);
        } else if (button.classList.contains("operator")) {
            setOperator(button.textContent);
        } else if (button.classList.contains("equals")) {
            evaluate();
        } else if (button.classList.contains("clear")) {
            handleClear();
        } else if (button.classList.contains("backspace")) {
            handleBackspace();
        } else if (button.classList.contains("dot")) {
            handleDot();
        }
    });
});

//add keyboard support
window.addEventListener("keydown", (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === ".") handleDot();
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") handleBackspace();
    if (e.key === "Escape") handleClear();
    if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
});
