;"use strict";

let buttonPopup         = document.querySelector('#orderPopupButton');
let popupOrder          = document.querySelector('#popupOrder');
let fillPopupOrder      = document.querySelector('#closePopupBackground');
let closePopupOrder     = document.querySelector('#closePopup');
let scrolled, timer;

buttonPopup.addEventListener('click', () => showPopup());
fillPopupOrder.addEventListener('click', () => hidePopup());
closePopupOrder.addEventListener('click', () => hidePopup());

function showPopup () {
        let scroll = document.pageYOffset ||
                        (document.documentElement && document.documentElement.scrollTop) ||
                        (document.body && document.body.scrollTop);
        scrolled = scroll;
        scrollTop(scroll - (popupOrder.clientHeight / 2));
        popupOrder.setAttribute('style', `top: ${scroll - (popupOrder.clientHeight / 2)}px;`);
        popupOrder.classList.remove('hide_left');
        fillPopupOrder.classList.remove('_none');
}

function hidePopup () {
        popupOrder.classList.add('hide_left');
        fillPopupOrder.classList.add('_none');
}
function scrollTop(position = 0) {
        if(scrolled > position){
                window.scrollTo(position, scrolled);
                scrolled -= 30;
                timer = setTimeout(() => scrollTop(position), 20);
        }else {
                clearTimeout(timer);
        }
}
