
// object to hold the calculator 
    // the number we see
    // the first inputted number
    // the operator
    // the second inputted number


const calculator = {
    displayValue: '0',
    firstRotating: null,
    operator: null,
    secondRotating: false
};

const keyArea = document.querySelector('.calculatorKeys');

// event listener for every action/ button

keyArea.addEventListener('click', event => {
    const target = event.target
    
    if (target.classList.contains('operator')) {
        handleOperator(target.value)
        updateDisplay()
        return
    }

    // need to return to end the function
    
    else if (target.classList.contains('decimal')) {
        handleDecimal(target.value)
        updateDisplay()
        return
    }
    
    else if (target.classList.contains('clear')) {
        handleClear()
        updateDisplay()
        return
    }

    else if (target.classList.contains('erase')) {
        handleErase()
        updateDisplay()
        return
    }
    
    handleNumbers(target.value)
    updateDisplay()
});

const handleErase = () => {
    const erase = calculator.displayValue.split('').slice(0, -1).join('');
    calculator.displayValue = erase;

    calculator.displayValue === '' ? calculator.displayValue = '0' : ''
    
}

// function to update display

const updateDisplay = () => {
    const calcDisplay = document.querySelector('.calculatorScreen')
    calcDisplay.value = calculator.displayValue
    console.log(calculator)
};

// this needs to be called after every action as we need it to constantly update the display

// clear button 

const handleClear = () => {
    calculator.displayValue = '0'
    calculator.firstRotating = null,
    calculator.secondRotating = false,
    calculator.operator = null
};

// function to handle displayed numbers

const handleNumbers = (value) => {

   // if second number is true (first number has already been inputted) then change the display value to that number, THEN make it false, which will in turn make the regular expression fire off

    if (calculator.secondRotating) {
        calculator.displayValue = value;
        calculator.secondRotating = false;
    }

    else {
        if (calculator.displayValue === '0') {
            calculator.displayValue = value
        }
    
        else {
            calculator.displayValue += value
        }
    }
};

// handle decimal

const handleDecimal = (value) => {

        if (calculator.secondRotating === true) {
            calculator.displayValue = '0.'
            calculator.secondRotating = false;
            return
        }
    
        if (!calculator.displayValue.includes('.')) {
            calculator.displayValue += value
        }

        console.log(calculator.displayValue)
};

// function for every time the operator is clicked 
// it updates our calculator object (numbers and operator) so that we can actually rotate and calculate the numbers

const handleOperator = (value) => {
 
    const inputValue = parseFloat(calculator.displayValue)

    // because everything is originally a string, we need to extract that value into a number for our calculation function
    // *** Use parseFloat instead of parseInt, because parseFloat converts it into a float with a decimal, where parseInt does not

    if (calculator.operator && calculator.secondRotating) {
        calculator.operator = value
        return

        // if the user clicks multiple operator/ changes their mind
    }

    // start off value for first number 

    if (calculator.firstRotating === null && inputValue !== NaN) {
        calculator.firstRotating = inputValue
    } 

    // if operator is present execute calculate function
    
    else if (calculator.operator) {
        const result = calculate(calculator.firstRotating, inputValue, calculator.operator)

        // at the end we need to show the result
        // and make sure the first number is now the result
        // use String instead of toString because for toString the value always has to exist...which it doesn't always in this case

        calculator.displayValue = String(result);
        calculator.firstRotating = String(result);
    }

    // when operator is clicked, it's value is stored
    // ALSO second number becomes true 
    
    calculator.secondRotating = true
    calculator.operator = value

};

// function for all calculations 

const calculate = (firstNumber, secondNumber, operator) => {
    
    if (operator === "+") {
        return firstNumber + secondNumber 
    }

    else if (operator === "-") {
        return firstNumber - secondNumber
    }

    else if (operator === "*") {
        return firstNumber * secondNumber
    }

    else if (operator === "/") {
        return firstNumber / secondNumber
    }

    // if someone just clicks equals

    return firstNumber
};

