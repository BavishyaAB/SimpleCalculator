const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperandEntered: false,
    operator: null,
};
function display() { 
    const display = document.querySelector('#output1');
    display.value = calculator.displayValue;
}
function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }
      return secondOperand;
}
function inputDigit(digit) {
    const { displayValue, secondOperandEntered } = calculator;
  
    if (secondOperandEntered === true) {
      calculator.displayValue = digit;
      calculator.secondOperandEntered = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}
function inputDecimal(dot) {
    if (calculator.secondOperandEntered === true) {
        calculator.displayValue = '0.'
        calculator.secondOperandEntered = false;
        return
    }
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
}
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    if (operator && calculator.secondOperandEntered)  {
      calculator.operator = nextOperator;
      return;
    }
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
  
      calculator.displayValue = `${parseFloat(result.toFixed(4))}`;
      calculator.firstOperand = result;
    }
    calculator.secondOperandEntered = true;
    calculator.operator = nextOperator;
}
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperandEntered = false;
    calculator.operator = null;
} 
const keys = document.querySelectorAll('.btn');
console.log(keys);
for(let i=0;i<keys.length;i++){
    keys[i].addEventListener('click',(e)=>{
        const value = e.target.value;
        console.log(value);
        switch (value) 
        {
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
              handleOperator(value);
              break;
            case '.':
              inputDecimal(value);
              break;
            case 'clear':
              resetCalculator();
              break;
            default:
              if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
              }
        }
        display();
    })
}