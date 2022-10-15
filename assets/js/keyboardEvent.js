const regex = /^[0-9-+/x%=.]$/;
let previousKeydown;
document.addEventListener('keydown', function (event) {
    if(event.key === 'Escape') reset();
    var key = event.key;
    if(regex.test(key) || key === "Enter" || key === "Equal"){
        let selectedClass = event.code;
        if(!(previousKeydown === 'Shift') && key === '='){
            selectedClass = "Enter"
        }else if(previousKeydown === 'Shift' && key === '+'){
            selectedClass = "Plus"
        }else if(previousKeydown === 'Shift' && key === '%'){
            selectedClass = "Mode"
        }
        keydownEvent(document.querySelector(`.${selectedClass}`))
    };
    previousKeydown = event.key;
});