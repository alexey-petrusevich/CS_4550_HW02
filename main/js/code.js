(function () {
  "use strict"

  // result textfield displayed by the calculator
  let resultTF = document.getElementById("result");
  // states of the calculator
  const states = {FIRST_OPERAND: 1, OPERATOR: 2, SECOND_OPERAND: 3};
  const operators = {ADD: 1, SUBTRACT: 2, MULTIPLY: 3, DIVIDE: 4};
  let currentState = states.FIRST_OPERAND;
  let firstOperand = 0, secondOperand = 0, operator;

  //--------------------------------------------
  // EVENT HANDLERS
  //--------------------------------------------

  // event handler for numeric button clicks
  function numberButtonClicked(number) {
    if (isFieldOverflown()) {
      return;
    }
    if (currentState == states.OPERATOR) {
      firstOperand = Number(resultTF.innerText);
      resultTF.innerText = number;
      currentState = states.SECOND_OPERAND;
    } else if (resultTF.innerText == "0") {
      resultTF.innerText = number;
    } else {
      resultTF.innerText += number;
    }
  }

  // event listener for operation buttons
  // TODO: complete
  function operationButtonClicked(operationType) {
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
    let value = Number(document.getElementById(buttonId));
    resultTF.innerHTML += value;
  }

  // event listener for other button clicks
  function otherButtonClicked(buttonId) {
    switch (buttonId) {
      case "clear":
        currentState = states.FIRST_OPERAND;
        firstOperand = 0;
        secondOperand = 0;
        resultTF.innerText = "0";
        break;
      case "decimal":
        if (!resultTF.innerText.includes(".")) {
          resultTF.innerText += ".";
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

  // OTHER FUNCTIONS
  /**
   * Checks if the length of the field is greater than 10 symbols
   * and returns TRUE if it is and FALSE otherwise
   *
   * @return TRUE if the length of the field is greater than 10 characters
   * and FALSE otherwise
   */
  function isFieldOverflown() {
    return resultTF.innerText.length > 10;
  }

  // Delay the setup code until page is fully loaded.
  window.addEventListener('load',
      setupButtons,
      false);

})();