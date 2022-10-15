const regex = /^[0-9-+/x%=.*]$/;
let previousKeydown;
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