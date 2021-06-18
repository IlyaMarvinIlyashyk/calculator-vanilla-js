
// store all the data in the calculator object to keep a track of all the values

const calculator = {
    displayedValue: '0',
    firstOperator: null,
    secondOperator: false,
    operator: null
}

// function to update display

const updateDisplay = () => {   
    const calcDisplay = document.querySelector(".calculatorScreen");
    calcDisplay.value = calculator.displayedValue;
    
    // calcDisplay value is now going to be equal to and updated based on the value in the displayedValue in the calculator object
}


const inputDigitUpdater = (digit) => {

    // if second number is true (first name has already been inputted) then change the display value to that number, THEN make it false, which will in turn make the regular expression fire off

    if (calculator.secondOperator === true) {
        calculator.displayedValue = digit;
        calculator.secondOperator = false;
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

    // calculator.displayedValue = displayedValue + decimal

    if (!calculator.displayedValue.includes(decimal)) {
        calculator.displayedValue += decimal
    }
}


const handleOperator = (actualOperator) => {

    // parseFloat() looks for value in string and coverts to number

    const { displayedValue, firstOperator, operator } = calculator

    const inputValue = parseFloat(displayedValue);

    if (firstOperator === null && inputValue !== NaN) {
        calculator.firstOperator = inputValue
    }

    else if (operator) {
        const result = calculate(firstOperator, inputValue, operator)

        calculator.displayedValue = result;
        calculator.firstOperator = result
    } 

    calculator.secondOperator = true
    calculator.operator = actualOperator    

}

const calculate = (firstOperator, secondOperator, operator) => {
    if (operator === "+") {
        return firstOperator + secondOperator
    }

    else if (operator === "-") {
        return firstOperator - secondOperator
    }

    else if (operator === "/") {
        return firstOperator / secondOperator
    }

    else if (operator === "*") {
        return firstOperator * secondOperator
    }

    // when a new operator is selected or the equals is pressed
    // carry out the given task of the last operator 

    console.log(selectedOperator)

    return secondOperator 
}

const clear = () => {
    calculator.displayedValue = '0'
    calculator.firstOperator = null
    calculator.secondOperator = false
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

    else if (target.classList.contains('equals')) {
        console.log(target.value)
        return
    }

    inputDigitUpdater(target.value);
    updateDisplay()

})
