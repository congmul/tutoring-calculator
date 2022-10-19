// Select all buttons from a calculator.
const btns = document.getElementsByClassName('customized-btn');
// Display number on the input element.
const displayNumberEl = document.querySelector('input')
// Use enums for switch or if statement
// it can help a programmer to avoid their typo mistake
const OPERATORVALUE = {
    plus: '+',
    minus: '-',
    times: 'x',
    division: '/',
    mode: '%'
}
let operator = undefined;
let firstNums = undefined;
let secondNums = undefined;

function reset() {
    displayNumberEl.value = 0;
    operator = undefined;
    firstNums = undefined;
    secondNums = undefined;
    return;
}

function onclick(event) {
    const state = event.target.dataset.state;
    if(state === 'minus-plus') {
        alert('In development, does not work at the moment');
        return;
    }
    if(event.target.matches('.customized-btn')){
        // To handle size of the number to display properly
        handleNumberSize()
        // To decide if an operator is needed.
        determineBehavior(state, event.target.textContent);
    
        let currentColor = event.target.style.background;
        event.target.style.background = 'rgb(210, 210, 210)';
        setTimeout(() => {
            event.target.style.background = currentColor;
        }, 100)
    }
}

function handleNumberSize() {
    if(displayNumberEl.value.length >= 7){
        // small & medium fontsize
        let percentage = 250 - (25 * (displayNumberEl.value.length - 6));
        displayNumberEl.style.fontSize = `${percentage > 0 ? percentage : 100}%`;
    }else{
        // large fontsize
        displayNumberEl.style.fontSize = '250%';
    }
}

function determineBehavior(state, targetValue) {
    if(state === 'reset'){
        reset();
    }else if(state === 'operator' && firstNums != null){
        operator = targetValue;
            displayNumberEl.value = '';
        setTimeout(() => {
            displayNumberEl.value = firstNums;
        },100)
    }else if(state === 'number' && !operator){
        firstNums ? firstNums += targetValue : firstNums = targetValue;
        let preFirstNums = displayNumberEl.value;
        if(firstNums.length < 12){
            displayNumberEl.value = firstNums;
        }else{
            displayNumberEl.value = preFirstNums;
            firstNums = preFirstNums;
        }
    }else if(state === 'number'){
        secondNums ? secondNums += targetValue : secondNums = targetValue;
        let preSecondNums = displayNumberEl.value;
        if(secondNums.length < 12){
            displayNumberEl.value = secondNums;
        }else{
            displayNumberEl.value = preSecondNums;
            secondNums = preSecondNums;
        }
    }else if(state === 'result' && operator && firstNums && secondNums){
        // Actually calculating two numbers
        let result = calculator(firstNums, operator, secondNums) 
        displayNumberEl.value = result;
        handleNumberSize();
        operator = undefined;
        firstNums = undefined;
        secondNums = undefined;
    }
}

function calculator(firstNums, operator, secondNums){
    let result;
    switch(operator){
        case OPERATORVALUE.plus:
            result = plusMinusDivideOp(firstNums, operator, secondNums);
        break;
        case OPERATORVALUE.minus:
            result = plusMinusDivideOp(firstNums, operator, secondNums);
        break;
        case OPERATORVALUE.times:
            result = multiplyOp(firstNums, secondNums);
        break;
        case OPERATORVALUE.division:
            result = plusMinusDivideOp(firstNums, operator, secondNums);
        break;
        case OPERATORVALUE.mode:
            result = firstNums % secondNums;
        break;
    }
    return !isFloat(result) ? result : displayFloat(result);
}
// To avoid the wrong results because of decimals.
// Convert decimals into integers and back to the original after calculating them.
// This is for plus, minus, division.
function plusMinusDivideOp(num01, op, num02){
    let amountNum01 = num01.toString().split('.')[1]?.length || 0;
    let amountNum02 = num02.toString().split('.')[1]?.length || 0;
    const amountOfDecimalPoint = Math.max(amountNum01, amountNum02);
    const firstIntNum = parseFloat(num01) * Math.pow(10, amountOfDecimalPoint);
    const secondIntNum = parseFloat(num02) * Math.pow(10, amountOfDecimalPoint);
    if(op === OPERATORVALUE.plus){
        return (firstIntNum + secondIntNum) / Math.pow(10, amountOfDecimalPoint);
    }else if(op === OPERATORVALUE.minus){
        return (firstIntNum - secondIntNum) / Math.pow(10, amountOfDecimalPoint);
    }else if(op === OPERATORVALUE.division){
        return (firstIntNum / secondIntNum);
    }
}
// To avoid the wrong results because of decimals.
// Convert decimals into integers and back to the original after calculating them.
// This is for times.
function multiplyOp(num01, num02){
    let amountNum01 = num01.toString().split('.')[1]?.length || 0;
    let amountNum02 = num02.toString().split('.')[1]?.length || 0;
    const amountOfDecimalPoint = amountNum01 + amountNum02;
    const firstIntNum = parseFloat(num01) * Math.pow(10, amountNum01);
    const secondIntNum = parseFloat(num02) * Math.pow(10, amountNum02);

    return (firstIntNum * secondIntNum) / Math.pow(10, amountOfDecimalPoint);
}

// Check if n is float or not.
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}
// display limited lenth of number
// maximum: 14 lengths after the point.
function displayFloat(n){
    let numberArr = n.toString().split('.');
    if(numberArr[1]?.length > 15){
        return n.toFixed(14);
    }
    return n;
}

// Adding onclick function into each buttons.
window.document.querySelector('.calculator-wrapper').onclick = onclick;