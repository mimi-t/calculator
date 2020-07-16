let previousNumber = '';
let currentNumber = '';
let currentOperator = '';
const display_div = document.querySelector('#display');
const number_button = document.querySelectorAll('.number');
const operator_button = document.querySelectorAll('.operator');
const backspace_button = document.querySelector('#bksp');
const clear_button = document.querySelector('#clear');
const equal_button = document.querySelector('#equal');

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) =>  x / y
const operate = (operator, x, y) => {
    switch (operator) {
        case 'add':
            return add(x, y);
            break;
        case 'subtract':
            return subtract(x, y);
            break;
        case 'multiply':
            return multiply(x, y);
            break;
        case 'divide':
            return divide(x, y);
            break;
    }
}

const displayInput = (number) => {
    display_div.innerHTML = number;
}

const performOperation = (newOperator) => {
    previousNumber = Math.round(operate(currentOperator, +previousNumber, 
        +currentNumber) * 10000000000) / 10000000000;
    currentOperator = newOperator;
    currentNumber = '';
    displayInput(previousNumber);
}

const clearCalc = () => {
    previousNumber = '';
    currentNumber = '';
    currentOperator = '';
    displayInput('');
}

const isDivideByZero = () => currentNumber === '0' & currentOperator ==='divide' ? true : false;

const displayDivideByZero = () => {
    clearCalc();
    displayInput('Cannot divide by 0!');
}

number_button.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (currentOperator && previousNumber === '') {
            previousNumber = currentNumber;
            currentNumber = '';
        } 
        currentNumber += e.target.dataset.key;
        displayInput(currentNumber);
    });
});

operator_button.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (currentNumber === '' && previousNumber === '') {                                        // when no numbers have been entered yet
            return;
        } else if ((currentNumber !== '' && previousNumber === '')                                  // when first number has been entered
        || (currentNumber === '' && previousNumber !== '')) {                                       // OR when equal was clicked immediately before
            currentOperator = e.target.dataset.key;                                                 
        } else {                                                                                    // when previous and current number exist
            if (isDivideByZero()) {
                displayDivideByZero();
            } else {
                performOperation(e.target.dataset.key);
            }
        }
    });
});

equal_button.addEventListener('click', (e) => {
    if (isDivideByZero()) {
        displayDivideByZero();
    } else if (currentNumber !== '' && previousNumber !== '') {
        performOperation(e.target.dataset.key);
    }
});

clear_button.addEventListener('click', (e) => {
    clearCalc();
});

// to do: backspace, don't allow more than one zero input (before decimal point)
// tweak css: round corners, fix dimensions, change colours, add box shadows, darken bg-colour of buttons when clicked
// consider adding view of equation entered (e.g. 7 x 8 + 9)