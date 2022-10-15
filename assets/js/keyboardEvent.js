const regex = /^[0-9-+/x%=.*]$/;
let previousKeydown;

function keydownEvent(eventTarget){
    const state = eventTarget.dataset.state;
    inputStringValidator()
    determineBehavior(state, eventTarget.textContent);

    let currentColor = eventTarget.style.background;
    eventTarget.style.background = 'rgb(210, 210, 210)';
    setTimeout(() => {
        eventTarget.style.background = currentColor;
    }, 100)
}

document.addEventListener('keydown', function (event) {
    var key = event.key;
    if(regex.test(key) || key === "Enter" || key === "Equal" || key === "Escape"){
        let selectedClass = event.code;
        if(!(previousKeydown === 'Shift') && key === '='){
            selectedClass = "Enter"
        }else if(previousKeydown === 'Shift' && key === '+'){
            selectedClass = "Plus"
        }else if(previousKeydown === 'Shift' && key === '%'){
            selectedClass = "Mode"
        }else if(previousKeydown === 'Shift' && key === '*'){
            selectedClass = "KeyX"
        }
        keydownEvent(document.querySelector(`.${selectedClass}`))
    };
    previousKeydown = event.key;
});