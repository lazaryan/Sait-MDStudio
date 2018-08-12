;"use strict";

let galerry             = document.querySelector('.js-grid');
let project             = document.querySelector('#popupProject');
let closeProject        = document.querySelector('#closePopupProject');
let scrolled, timer;

galerry.addEventListener('click', (e) => {
        let target = e.target;
        if(target.classList.contains('js-grid__image')){
                showPopupGallery();
        }
}, true);

closeProject.addEventListener('click', () => hidePopupGallery());

function showPopupGallery () {
        closeProject.classList.remove('_none');

        let scroll = document.pageYOffset ||
                        (document.documentElement && document.documentElement.scrollTop) ||
                        (document.body && document.body.scrollTop);

        scrolled = scroll;
        if (scroll > 250) {
                scrollTop(scroll - (project.clientHeight / 2));
                project.setAttribute('style', `top: ${(screen.height / 2) - (project.clientHeight / 2)}px;`);
        } else {
                project.setAttribute('style', `top: ${(screen.height / 2) - (project.clientHeight / 2)}px;`);
        }

        project.classList.add('project_active');
}

function hidePopupGallery () {
        project.classList.remove('project_active');
        closeProject.classList.add('_none');
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
