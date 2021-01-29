(function () {
  "use strict"

  // state of the calculator
  let calculator = {
    firstOperand: 0,
    secondOperand: 0,
    operator: "plus-equal",
    currentState: 1
  };

  /**
   * Event handler function for handling numerical button clicks.
   *
   * @param buttonId the id of the button
   */
  function numberButtonClicked(buttonId) {
    if (calculator.currentState == 2) {
      document.getElementById("result").innerText = buttonId;
      calculator.currentState = 3;
    } else if (document.getElementById("result").innerText.length > 9) {
      return;
    } else if (document.getElementById("result").innerText == "0") {
      document.getElementById("result").innerText = buttonId;
    } else {
      document.getElementById("result").innerText += buttonId;
    }
  }

  /**
   * Event handler function for handling operation button clicks (+, -, *, /).
   *
   * @param operationType type of operation being performed
   */
  function operationButtonClicked(operationType) {
    if (calculator.currentState == 1) {
      calculator.firstOperand = Number(
          document.getElementById("result").innerText);
    } else if (calculator.currentState == 3) {
      calculator.secondOperand = Number(
          document.getElementById("result").innerText);

      let calculatedResult = function () {
        switch (calculator.operator) {
          case "plus-equal":
            return calculator.firstOperand + calculator.secondOperand;
          case "subtract":
            return calculator.firstOperand - calculator.secondOperand;
          case "multiply":
            return calculator.firstOperand * calculator.secondOperand;
          case "divide":
            return calculator.firstOperand / calculator.secondOperand;
        }
      }();

      document.getElementById(
          "result").innerText = function (value) {
        let renderedValue = value.toString();
        if (renderedValue.length > 10) {
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
      }(calculatedResult);

      calculator.firstOperand = calculatedResult;
    }
    calculator.currentState = 2;
    calculator.operator = operationType;
  }

  /**
   * Event handler function for other button clicks ("clear" and ".").
   *
   * @param buttonId id of the button clicked
   */
  function otherButtonClicked(buttonId) {
    switch (buttonId) {
      case "clear":
        calculator.currentState = 1;
        calculator.firstOperand = 0;
        calculator.secondOperand = 0;
        document.getElementById("result").innerText = "0";
        break;
      case "decimal":
        if (!document.getElementById("result").innerText.includes(".")) {
          document.getElementById("result").innerText += ".";
        }
        break;
    }
  }

  /**
   * Sets up event listeners for each button in the calculator.
   */
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