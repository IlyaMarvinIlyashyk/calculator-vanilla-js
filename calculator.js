
// store all the data in the calculator object to keep a track of all the values

const calculator = {
    displayedValue: '0',
    firstRotatingNumber: null,
    secondRotatingNumber: false,
    operator: null
}

// function to update display

const updateDisplay = () => {   
    const calcDisplay = document.querySelector(".calculatorScreen");
    calcDisplay.value = calculator.displayedValue;
    
    // calcDisplay value is now going to be equal to and updated based on the value in the displayedValue in the calculator object
}


const inputDigitUpdater = (digit) => {

    // if second number is true (first number has already been inputted) then change the display value to that number, THEN make it false, which will in turn make the regular expression fire off

    if (calculator.secondRotatingNumber === true) {
        calculator.displayedValue = digit;
        calculator.secondRotatingNumber = false;
    } 
    
    else {

        // if the value is 0, then change it to the target value 

        if (calculator.displayedValue === '0') {
            calculator.displayedValue = digit;
        }
        
        // else add on top the value
        
        else {
            calculator.displayedValue += digit;
        }
    }

}

const inputDecimal = (decimal) => {

    if (!calculator.displayedValue.includes(decimal)) {
        calculator.displayedValue += decimal
    }
}


const handleOperator = (actualOperator) => {

    // parseFloat() looks for value in string and coverts to number

    const { displayedValue, firstRotatingNumber, operator } = calculator

    const inputValue = parseFloat(displayedValue);

    if (firstRotatingNumber === null && inputValue !== NaN) {
        calculator.firstRotatingNumber = inputValue
    }

    else if (operator) {
        const result = calculate(firstRotatingNumber, inputValue, operator)

        calculator.displayedValue = result;
        calculator.firstRotatingNumber = result
        console.log("operator", operator)
    } 

    // else if (inputValue === !NaN) {
        console.log("input value", typeof(inputValue))
        calculator.secondRotatingNumber = true
        calculator.operator = actualOperator    
    // }

    console.log("calculator", calculator)
    console.log("first", calculator.firstRotatingNumber)
    console.log("second", calculator.secondRotatingNumber)


}


const calculate = (firstNumber, secondNumber, operator) => {
    if (operator === "+") {
        return firstNumber + secondNumber
    }

    else if (operator === "-") {
        return firstNumber - secondNumber
    }

    else if (operator === "/") {
        return firstNumber / secondNumber
    }

    else if (operator === "*") {
        return firstNumber * secondNumber
    }

    // when a new operator is selected or the equals is pressed
    // carry out the given task of the last operator 

    // else equals 

    return secondNumber 
}

const clear = () => {
    calculator.displayedValue = '0'
    calculator.firstRotatingNumber = null
    calculator.secondRotatingNumber = false
    calculator.operator = null
}

const keys = document.querySelector(".calculatorKeys");

keys.addEventListener("click", e => {
    const target = e.target;

    // matches() returns a boolean which searches the string to match against a regular expressions 
    
    // const value = e.target.value

    // return value

    if (!target.matches('button')) {
        return
    }

    else if (target.classList.contains('operator')) {
        handleOperator(target.value);
        // remember you need to be updating the display after every action  
        updateDisplay()
        return 
    }

    else if (target.classList.contains('decimal')) {
        inputDecimal(target.value); 
        updateDisplay()
        return
    }

    else if (target.classList.contains('clear')) {
        clear()
        updateDisplay()
        return 
    }

    inputDigitUpdater(target.value);
    updateDisplay()

})
