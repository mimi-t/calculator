const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
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