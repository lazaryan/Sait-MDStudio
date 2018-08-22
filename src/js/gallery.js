;"use strict";

let galerry             = document.querySelector('#grid');
let project             = document.querySelector('#popupProject');
let closeProject        = document.querySelector('#closePopupProject');

let scrolled, timer;

let min = 0;
let max = document.querySelector('.grid__item').length - 1;
let position = 0;

let object_project = {
        block: undefined,
        number: 0,
        folder: '',
        images: []
};

galerry.addEventListener('click', (e) => {
        let target = e.target;

        if(target.classList.contains('js-grid__image')){
                object_project.block = target.parentNode;

                showPopupGallery();
                setDataImages();
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

function setDataImages () {
        let images = object_project.block.querySelectorAll('img');

        object_project.folder = images[0].dataset.folderProject;
        object_project.number = object_project.block.dataset.number;
        
        for (let i = 0; i < images.length; i++) {
               object_project.images.push(images[i].dataset.nameFile);
        }

        console.log(object_project)
}
