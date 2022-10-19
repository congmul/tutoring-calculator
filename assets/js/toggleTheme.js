const colorVAR = window.document.querySelector(':root');

let isDark = false;
function toggle(){
    if(isDark) {
        isDark = !isDark;
        colorVAR.style.setProperty('--primary-background-color', "rgb(80, 80, 80)");
        colorVAR.style.setProperty('--primary-header-color', "rgb(50, 50, 50)");
        colorVAR.style.setProperty('--primary-border-color', "rgb(50, 50, 50)");
        colorVAR.style.setProperty('--primary-btn-border-color-alpha', "rgba(80,80,80, 0.4)");
        colorVAR.style.setProperty('--primary-hover-color', "rgb(80, 80, 80)");
        colorVAR.style.setProperty('--primary-font-color', "white");
        colorVAR.style.setProperty('--primary-input-color', "rgb(80, 80, 80)");
        colorVAR.style.setProperty('--primary-operator-color', "rgb(255, 153, 0)");
        colorVAR.style.setProperty('--primary-number-secondary-color', "rgb(100, 100, 100)");
        colorVAR.style.setProperty('--primary-number-color', "rgb(130, 130, 130)");
        colorVAR.style.setProperty('--primary-toggle-color', "white");
    }else{
        isDark = !isDark;
        colorVAR.style.setProperty('--primary-background-color', "white");
        colorVAR.style.setProperty('--primary-header-color', "antiquewhite");
        colorVAR.style.setProperty('--primary-border-color', "grey");
        colorVAR.style.setProperty('--primary-btn-border-color-alpha', "rgba(80,80,80, 0.4)");
        colorVAR.style.setProperty('--primary-hover-color', "rgb(100, 100, 100)");
        colorVAR.style.setProperty('--primary-font-color', "black");
        colorVAR.style.setProperty('--primary-input-color', "rgb(230, 230, 230");
        colorVAR.style.setProperty('--primary-operator-color', "rgb(255, 153, 0)");
        colorVAR.style.setProperty('--primary-number-secondary-color', "rgb(180, 180, 180)");
        colorVAR.style.setProperty('--primary-number-color', "rgb(230, 230, 230)");
        colorVAR.style.setProperty('--primary-toggle-color', "black");
    }
}
