;"use strict";

let galerry             = document.querySelector('.js-grid');
let project             = document.querySelector('#popupProject');
let closeProject        = document.querySelector('#closePopupProject');

galerry.addEventListener('click', (e) => {
        let target = e.target;
        if(target.classList.contains('js-grid__image')){
                showPopupGallery();
        }
}, true);

function showPopupGallery () {
        closeProject.classList.remove('_none');
}
