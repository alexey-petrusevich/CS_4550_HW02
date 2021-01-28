(function () {
  "use strict"

  // states of the calculator
  const states = {FIRST_OPERAND: 1, OPERATOR: 2, SECOND_OPERAND: 3};
  const operators = {ADD: 1, SUBTRACT: 2, MULTIPLY: 3, DIVIDE: 4};
  // const firstSecondOperator = {firstOperand : 0, secondOperand: 0, operator : operators.ADD};
  let currentState = states.FIRST_OPERAND;
  let firstOperand = 0, secondOperand = 0, operator;

  //--------------------------------------------
  // EVENT HANDLERS
  //--------------------------------------------

  // event handler for numeric button clicks
  function numberButtonClicked(number) {
    if (currentState == states.OPERATOR) {
      document.getElementById("result").innerText = number;
      currentState = states.SECOND_OPERAND;
    } else if (document.getElementById("result").innerText.length > 9) {
      return;
    } else if (document.getElementById("result").innerText == "0") {
      document.getElementById("result").innerText = number;
    } else {
      document.getElementById("result").innerText += number;
    }
  }

  function calculate() {
    switch (operator) {
      case operators.ADD:
        return firstOperand + secondOperand;
        break;
      case operators.SUBTRACT:
        return firstOperand - secondOperand;
        break;
      case operators.MULTIPLY:
        return firstOperand * secondOperand;
        break;
      case operators.DIVIDE:
        return firstOperand / secondOperand;
        break;
    }
  }

  // normalizes the value to the length of 10 characters
  function normalize(value) {
    let renderedValue = value.toString();
    if (renderedValue.length > 10) {
      // normalize
      if (value >= 10000000000) {
        // exponentiate
        return value.toExponential(3);
      } else {
        // truncate
        return renderedValue.substr(0, 10);
      }

    } else {
      return renderedValue;
    }
    if (value < 10000000000) {
      if (renderedValue.toString() > 10) {
        return renderedValue.substr(0, 11);
      } else {
        return value.toExponential(6).toString();
      }
    } else {
      return renderedValue;
    }
  }

  // event listener for operation buttons
  // TODO: complete
  function operationButtonClicked(operationType) {
    if (currentState == states.FIRST_OPERAND) {
      firstOperand = Number(document.getElementById("result").innerText);
    } else if (currentState == states.SECOND_OPERAND) {
      secondOperand = Number(document.getElementById("result").innerText);
      let calculatedResult = calculate();
      document.getElementById("result").innerText = normalize(calculatedResult);
      firstOperand = calculatedResult;
    }

    currentState = states.OPERATOR;
    switch (operationType) {
      case "plus-equal":
        operator = operators.ADD;
        break;
      case "subtract":
        operator = operators.SUBTRACT;
        break;
      case "multiply":
        operator = operators.MULTIPLY;
        break;
      case "divide":
        operator = operators.DIVIDE;
        break;
      default:
        throw "Unknown operation type";
    }
  }

  // event listener for other button clicks
  function otherButtonClicked(buttonId) {
    switch (buttonId) {
      case "clear":
        currentState = states.FIRST_OPERAND;
        firstOperand = 0;
        secondOperand = 0;
        document.getElementById("result").innerText = "0";
        break;
      case "decimal":
        if (!document.getElementById("result").innerText.includes(".")) {
          document.getElementById("result").innerText += ".";
        }
        break;
    }
  }

  //--------------------------------------------

  // setup event listeners for each button
  function setupButtons() {
    const operations = ["plus-equal", "subtract", "multiply", "divide"];
    const other = ["clear", "decimal"];

    // numerical buttons
    for (let buttonId = 0; buttonId < 10; buttonId++) {
      let btn = document.getElementById(buttonId);
      btn.addEventListener('click',
          () => numberButtonClicked(buttonId),
          false);
    }

    // operation buttons
    operations.forEach(operation => {
      let btn = document.getElementById(operation);
      btn.addEventListener('click',
          () => operationButtonClicked(operation),
          false);
    });

    // other buttons
    other.forEach(elementId => {
      let btn = document.getElementById(elementId);
      btn.addEventListener("click",
          () => otherButtonClicked(elementId),
          false);
    })
  }

  // Delay the setup code until page is fully loaded.
  window.addEventListener('load',
      setupButtons,
      false);

})();