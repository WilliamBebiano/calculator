// Get the DOM elements
const currentInput = document.querySelector('.currentInput');
const buttons = document.querySelectorAll('button');
const eraseBtn = document.querySelector('#erase');
const clearBtn = document.querySelector('#clear');
const evaluateBtn = document.querySelector('#evaluate');
const percentBtn = document.querySelector('#percent');


// Initialize the screen value
let realTimeScreenValue = [''];

// Add event listeners to the buttons
clearBtn.addEventListener('click', () => {
  resetCalculator();
});

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const btnId = btn.id;
    const btnValue = btn.value;

    // Handle number and operator buttons
    if (!btnId.match('erase')) {
      // Add the button value to the screen
      realTimeScreenValue.push(btnValue);
      currentInput.innerHTML = realTimeScreenValue.join('');

      // Check if the expression is valid and evaluate it
      const expression = realTimeScreenValue.join('');
      if (/^-?\d+(\.\d+)?([+\-*\/%]\d+(\.\d+)?)*$/.test(expression)) {

      }
      // Evaluate the expression when the equals button is pressed
      if (btnId.match('evaluate')) {
        evaluateExpressionOnScreen();
      }
    }
    // Handle the erase button
    if (btnId.match('erase')) {
      realTimeScreenValue.pop();
      currentInput.innerHTML = realTimeScreenValue.join('')+ '%';
      evaluateExpressionOnScreen();
    }
  });
});


// Evaluate the expression on the screen and update the answer
function evaluateExpressionOnScreen() {
  const expression = realTimeScreenValue.join('');
  if (/^-?\d+(\.\d+)?([+\-*\/%]\d+(\.\d+)?)*$/.test(expression)) {
    const result = evaluateExpression(expression);
    realTimeScreenValue = [result.toString()];
    currentInput.innerHTML = result.toString();
  }
}


// Evaluate a mathematical expression and return the result
function evaluateExpression(expression) {
  if (expression.startsWith('-')) {
    expression = '0' + expression;
  }
  const operands = expression.split(/[-+/*%]/g).map(parseFloat);
  const operators = expression.split(/[0-9\.]+/g).filter(Boolean);

  let result = operands[0];

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const operand = operands[i + 1];
    switch (operator) {
      case '+':
        result += operand;
        break;
      case '-':
        result -= operand;
        break;
      case '*':
        result *= operand;
        break;
      case '/':
        result /= operand;
        break;
      case '%':
        result /= 100;
        break;
      default:
        break;
    }
  }
  return result;
 }
console.log(evaluateExpression('10%'))
// Reset the calculator
function resetCalculator() {
  realTimeScreenValue = [''];
  currentInput.innerHTML = '';
  
}

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;
  const allowedKeys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '+', '-', '*', '/', '.', '=', 'Enter', 'Backspace', 'Delete'
  ];
  if (allowedKeys.includes(key)) {
    const btn = document.querySelector(`button[value="${key}"]`);
    if (btn) {
      btn.click();
    }
    if (key === 'Enter') {
      evaluateBtn.click();
    }
    if (key === 'Backspace' || key === 'Delete') {
      eraseBtn.click();
    }
  }

});
