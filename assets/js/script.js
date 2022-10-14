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
        return;
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
        let result = calculator(parseInt(firstNums), operator, parseInt(secondNums))
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
            result = firstNums + secondNums;
        break;
        case '-':
            result = firstNums - secondNums;
        break;
        case 'x':
            result = firstNums * secondNums;
        break;
        case '/':
            result = firstNums / secondNums;
        break;
        case '%':
            result = firstNums % secondNums;
        break;
    }
    return result;
}


for (let i = 0; i < btns.length; i++){
    btns[i].onclick = onclick;
}