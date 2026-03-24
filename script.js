let display = document.getElementById("display");
let currentInput = "";

function updateDisplay() {
    display.innerText = currentInput || "0";
}

function appendNumber(num) {
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === "") return;

    let lastChar = currentInput.slice(-1);
    if ("+-*/".includes(lastChar)) {
        currentInput = currentInput.slice(0, -1);
    }

    currentInput += op;
    updateDisplay();
}

function appendDot() {
    let parts = currentInput.split(/[\+\-\*\/]/);
    let lastPart = parts[parts.length - 1];

    if (!lastPart.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = "";
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
    } catch {
        currentInput = "Error";
    }
    updateDisplay();
}

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) appendNumber(e.key);
    else if ("+-*/".includes(e.key)) appendOperator(e.key);
    else if (e.key === "Enter") calculate();
    else if (e.key === "Backspace") deleteLast();
    else if (e.key === ".") appendDot();
});