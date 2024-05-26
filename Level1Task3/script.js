"use strict";

var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'), // number buttons
  operator = document.querySelectorAll('.operators div'), // operator buttons
  result = document.getElementById('result'), // equal button
  clear = document.getElementById('clear'), // clear button
  resultDisplayed = false; // flag to keep an eye on what output is displayed

// Adding click handlers to number buttons
number.forEach(function(button) {
  button.addEventListener("click", function(e) {
    var currentString = input.textContent;
    var lastChar = currentString[currentString.length - 1];

    if (resultDisplayed === false || lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      input.textContent += e.target.textContent;
    } else {
      resultDisplayed = false;
      input.textContent = "";
      input.textContent += e.target.textContent;
    }
  });
});

// Adding click handlers to operator buttons
operator.forEach(function(button) {
  button.addEventListener("click", function(e) {
    var currentString = input.textContent;
    var lastChar = currentString[currentString.length - 1];

    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.textContent;
      input.textContent = newString;
    } else if (currentString.length == 0) {
      console.log("Enter a number first");
    } else {
      input.textContent += e.target.textContent;
    }
  });
});

// On click of 'equal' button
result.addEventListener("click", function() {
  var inputString = input.textContent;
  var numbers = inputString.split(/\+|\-|\×|\÷/g);
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.textContent = numbers[0];
  resultDisplayed = true;
});

// Clearing the input on press of clear
clear.addEventListener("click", function() {
  input.textContent = "";
});
