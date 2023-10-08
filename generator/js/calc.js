class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.shiftKeyPress = false;
    this.clear()
  }
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    if(operation){
      this.operation = operation
    }
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
  clearRand(){
    document.getElementById('search').value = '';
    showList();
  }
  toggleFooter(){
    var element = document.getElementById("openfooter");
    element.parentElement.classList.toggle("active");
  }
  toggleCalc() {
    document.getElementById('calc-box').checked === true ? document.getElementById('calc-box').checked = false : document.getElementById('calc-box').checked = true
  }
  toggleDice() {
    document.getElementById('dice-box').checked === true ? document.getElementById('dice-box').checked = false : document.getElementById('dice-box').checked = true
  }
  clearFooter(){
    document.getElementById('footer').innerHTML = '';
    document.getElementById("calcRJ").options.selectedIndex = 0;
    document.getElementById("calcJH").options.selectedIndex = 7;
    document.getElementById("calcSTR").value = 0;
    document.getElementById("calcMVMNT").value = 30;
    document.getElementById("calcDisc").options.selectedIndex = 0;
    document.getElementById("calcMastery").options.selectedIndex = 1;
    document.getElementById("calcMagic").options.selectedIndex = 0;
    document.getElementById("calcCasting").options.selectedIndex = 2;
    document.getElementById("calcDuration").options.selectedIndex = 0;
    document.getElementById("calcFocus").options.selectedIndex = 0;
    document.getElementById("calcRange").options.selectedIndex = 4;
    document.getElementById("calcTargets").options.selectedIndex = 1;
    document.getElementById("calcAOE").options.selectedIndex = 0;
    document.getElementById("calcComponent").options.selectedIndex = 0;
    document.getElementById("calcDice").options.selectedIndex = 1;
    document.getElementById("calcSide").options.selectedIndex = 9;
    document.getElementById("calcSave").options.selectedIndex = 0;
    document.getElementById("calcEffectNum").options.selectedIndex = 1;
    document.getElementById("calcEffect").options.selectedIndex = 0;
    document.getElementById("hdNum").options.selectedIndex = 2;
    document.getElementById("hdSize").options.selectedIndex = 2;
    document.getElementById("hdCON").options.selectedIndex = 0;
    calculateHitDice();
    calculateSpell();
  }
  resetHeader(){
    document.getElementById("tierProficiency").options.selectedIndex = 0;
    document.getElementById("numDice").options.selectedIndex = 0;
    document.getElementById("diceFaces").options.selectedIndex = 0;
    document.getElementById("rollModifier").options.selectedIndex = 0;
    document.getElementById("optionalModifier").options.selectedIndex = 0;
    document.getElementById("circumstantialModifier").options.selectedIndex = 0;
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const clearFooter = document.querySelector('[data-footer]')
const footerButton = document.getElementById('openfooter')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

footerButton.addEventListener('click', button => {
  calculator.toggleFooter()
})

clearFooter.addEventListener('click', button => {
  calculator.clearFooter()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  if (event.code === 'NumpadDecimal' || event.code === 'Numpad0' || event.code === 'Numpad1' || event.code === 'Numpad2' || event.code === 'Numpad3' || event.code === 'Numpad4' || event.code === 'Numpad5' || event.code === 'Numpad6' || event.code === 'Numpad7' || event.code === 'Numpad8' || event.code === 'Numpad9') {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.code === 'NumpadDivide' || event.code === 'NumpadMultiply' || event.code === 'NumpadSubtract' || event.code === 'NumpadAdd') {
    event.preventDefault();
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === 'A' && event.ctrlKey && event.shiftKey ){
    event.preventDefault();
    calculator.toggleCalc();
  }
  if (event.key === 'S' && event.ctrlKey && event.shiftKey) {
    event.preventDefault();
    calculator.toggleFooter();
  }
  if (event.key === 'D' && event.ctrlKey && event.shiftKey) {
    event.preventDefault();
    calculator.clearFooter();
  }
  if (event.key === 'Q' && event.ctrlKey && event.shiftKey ){
    event.preventDefault();
    calculator.toggleDice();
  }
  if (event.key === '~' && event.ctrlKey && event.shiftKey) {
    event.preventDefault();
    calculator.resetHeader();
  }
  if (event.key === 'PageDown' || event.key === 'PageUp'){
    event.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
  }
  if (event.code === 'NumpadEnter') {
    event.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
  }
  if (event.key === 'Escape'){
    calculator.clearRand();
  }
  if (event.shiftKey) {
    shiftKeyPress = true;
  } else {
    shiftKeyPress = false;
  }
});