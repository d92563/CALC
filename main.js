const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButtton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();   
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    calculate() {
        let computation;
        const current = parseFloat(this.currentOperand);
        const previous = parseFloat(this.previousOperand);
        if (isNaN(current) || isNaN(previous)) return;
        switch(this.operation) {
            case '*':
                computation = previous * current;
                break;
            case '/':
                computation = previous / current;
                 break;
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            default: return;
        }
        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''; 
    }

    deleteLast() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previousOperand === '' && calculator.currentOperand !== '' && calculator.readyToReset) {
            calculator.currentOperand = '';
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButtton.addEventListener('click', () => {
    if (calculator.readyToReset) return;
    calculator.deleteLast();
    calculator.updateDisplay();
})