"use strict";

let preloader = document.querySelector('#preloader');

function showPreloader() {
        setTimeout(() => {
                preloader.classList.add('preloader_fadeout');
                preloader.classList.remove('preloader_fadein');
        }, 2500);
}

window.onload = () => showPreloader();
