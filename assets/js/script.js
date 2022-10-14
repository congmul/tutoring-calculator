const btns = document.getElementsByClassName('customized-btn');
const displayNumberEl = document.querySelector('input')
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
    determineBehavior(state, event.target.textContent);

    let currentColor = event.target.style.background;
    event.target.style.background = 'rgb(210, 210, 210)';
    setTimeout(() => {
        event.target.style.background = currentColor;
    }, 100)
}

function determineBehavior(state, targetValue) {
    if(state === 'reset'){
        reset();
    }else if(state === 'operator'){
        operator = targetValue;
            displayNumberEl.value = '';
        setTimeout(() => {
            displayNumberEl.value = firstNums;
        },100)
    }else if(state === 'point'){
        // firstNums ? firstNums += targetValue : firstNums = targetValue;
    }else if(state === 'number' && !operator){
        firstNums ? firstNums += targetValue : firstNums = targetValue;
        displayNumberEl.value = firstNums;
    }else if(state === 'number'){
        secondNums ? secondNums += targetValue : secondNums = targetValue;
        displayNumberEl.value = secondNums;
    }else if(state === 'result' && operator && firstNums && secondNums){
        let result = calculator(firstNums, operator, secondNums)
        displayNumberEl.value = result;
        operator = undefined;
        firstNums = undefined;
        secondNums = undefined;
    }
}

function calculator(firstNums, operator, secondNums){
    let result;
    switch(operator){
        case '+':
            result = plusMinusDivideOp(firstNums, operator, secondNums);
        break;
        case '-':
            result = plusMinusDivideOp(firstNums, operator, secondNums);
        break;
        case 'x':
            result = multiplyOp(firstNums, secondNums);
        break;
        case '/':
            result = plusMinusDivideOp(firstNums, operator, secondNums);
        break;
        case '%':
            result = firstNums % secondNums;
        break;
    }
    return !isFloat(result) ? result : displayFloat(result);
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function plusMinusDivideOp(num01, op, num02){
    let amountNum01 = num01.toString().split('.')[1]?.length || 0;
    let amountNum02 = num02.toString().split('.')[1]?.length || 0;
    const amountOfDecimalPoint = Math.max(amountNum01, amountNum02);
    const firstIntNum = parseFloat(num01) * Math.pow(10, amountOfDecimalPoint);
    const secondIntNum = parseFloat(num02) * Math.pow(10, amountOfDecimalPoint);
    if(op === '+'){
        return (firstIntNum + secondIntNum) / Math.pow(10, amountOfDecimalPoint);
    }else if(op === '-'){
        return (firstIntNum - secondIntNum) / Math.pow(10, amountOfDecimalPoint);
    }else if(op === '/'){
        return (firstIntNum / secondIntNum);
    }
}
function multiplyOp(num01, num02){
    let amountNum01 = num01.toString().split('.')[1]?.length || 0;
    let amountNum02 = num02.toString().split('.')[1]?.length || 0;
    const amountOfDecimalPoint = amountNum01 + amountNum02;
    const firstIntNum = parseFloat(num01) * Math.pow(10, amountNum01);
    const secondIntNum = parseFloat(num02) * Math.pow(10, amountNum02);

    return (firstIntNum * secondIntNum) / Math.pow(10, amountOfDecimalPoint);
}
function displayFloat(n){
    let numberArr = n.toString().split('.');
    if(numberArr[1]?.length > 15){
        return n.toFixed(14);
    }
    return n;
}

for (let i = 0; i < btns.length; i++){
    btns[i].onclick = onclick;
}