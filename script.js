const screen = document.querySelector('input[name="screen"]');

function appendToDisplay(value) {
  screen.value += value;
}

function clearScreen() {
  screen.value = '';
}

function calculateResult() {
  try {
    const expression = screen.value.replace('x', '*');
    const result = evaluateExpression(expression);
    screen.value = result;
  } catch (error) {
    screen.value = 'Error';
  }
}

function evaluateExpression(expression) {
  const operators = ['+', '-', '*', '/'];
  const tokens = expression.split(' ');
  const output = [];
  const operatorStack = [];

  for (const token of tokens) {
    if (!operators.includes(token)) {
      output.push(parseFloat(token));
    } else {
      while (
        operatorStack.length > 0 &&
        precedence(operatorStack[operatorStack.length - 1]) >= precedence(token)
      ) {
        output.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  }
  while (operatorStack.length > 0) {
    output.push(operatorStack.pop());
  }
  const resultStack = [];
  for (const token of output) {
    if (typeof token === 'number') {
      resultStack.push(token);
    } else {
      const operand2 = resultStack.pop();
      const operand1 = resultStack.pop();
      const result = performOperation(operand1, operand2, token);
      resultStack.push(result);
    }
  }
  return resultStack[0];
}

function precedence(operator) {
  if (operator === '+' || operator === '-') {
    return 1;
  } else if (operator === 'x' || operator === '/') {
    return 2;
  }
  return 0;
}

function performOperation(operand1, operand2, operator) {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      if (operand2 === 0) {
        throw new Error('Division by zero');
      }
      return operand1 / operand2;
    default:
      throw new Error('Invalid operator');
  }
}