(function () {
  "use strict"

  // result textfield displayed by the calculator
  let result = document.getElementById("result")
  let temp = 0; // to hold value typed in

  //--------------------------------------------
  // EVENT HANDLERS
  //--------------------------------------------

  // event handler for numeric button clicks
  function number_button_clicked(number) {
    if (result.innerText == "0") {
      result.innerText = number;
    } else {
      result.innerText += number;
    }
  }

  // event listener for operation buttons
  // TODO: complete
  function operator_button_clicked(operationType) {
    switch (operationType) {
      case "plus-equal":
        result += temp;
        break;
      case "subtract":
        break;
      case "multiply":
        break;
      case "divide":
        break;
      default:
        throw "Unknown operation type";
    }
    let value = Number(document.getElementById(buttonId));
    result.innerHTML += value;
  }

  // event listener for other button clicks
  function other_button_clicked(buttonId) {
    switch (buttonId) {
      case "clear":
        result.innerText = "0";
        temp = 0;
        break;
      case ".":
        if (!result.includes(".")) {
          result.innerText += ".";
        }
        break;
    }
  }

  //--------------------------------------------


  // setup event listeners for each button
  function setup_buttons() {
    const operations = ["plus-equal", "substract", "multiply", "divide"];
    const other = ["click", "decimal"];

        // numerical buttons
    for (let buttonId = 0; buttonId < 10; buttonId++) {
      let btn = document.getElementById(buttonId);
      btn.addEventListener('click',
          () => number_button_clicked(buttonId),
          false);
    }

    // operation buttons
    operations.forEach(operation => {
      let btn = document.getElementById(operation);
      btnPlusEqual.addEventListener('click',
          () => operation_button_clicked(operation),
          false);
    });

    // other buttons
    other.forEach(elementId => {
      let btn = document.getElementById(Id);
      btnClear.addEventListener("click",
          () => other_button_clicked(elementId),
          false);
    })
  }

  // Delay the setup code until page is fully loaded.
  window.addEventListener('load',
      setup_buttons,
      false);

})();