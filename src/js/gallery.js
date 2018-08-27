;"use strict";

let galerry             = document.querySelector('#grid');
let project             = document.querySelector('#popupProject');
let closeProject        = document.querySelector('#closePopupProject');
let showImage           = document.querySelector('.js-project__show');
let controller          = document.querySelector('.js-project__controller');

let scrolled, timer;

let min = 0;
let max = document.querySelectorAll('.js-grid__item').length - 1;

let object_project = {
        block: undefined,
        number: 0,
        folder: '',
        images: [],
        position: 0
};

galerry.addEventListener('click', (e) => {
        let target = e.target;

        if(target.classList.contains('js-grid__image')){
                object_project.block = target.parentNode;

                showPopupGallery();
                setDataImages(target.parentNode);
                setGallery();
        }
}, true);

closeProject.addEventListener('click', () => hidePopupGallery());
project.addEventListener('click', (e) => {
        let target = e.target;

        if (target.classList.contains('js-project__prev')) {
                prevProject();
        } else if (target.classList.contains('js-project__next')) {
                nextProject();
        }
});

function prevProject () {
        let number = +object_project.number - 1;

        clearData();
        clearController();

        let proj = number >= min
                        ? document.querySelector(`.js-grid__item[data-number="${number}"]`)
                        : document.querySelector(`.js-grid__item[data-number="${max}"]`);

        setDataImages(proj);
        setGallery();
}

function nextProject () {
        let number = +object_project.number + 1;

        clearData();
        clearController();

        console.log(number);

        let proj = number <= max
                        ? document.querySelector(`.js-grid__item[data-number="${number}"]`)
                        : document.querySelector(`.js-grid__item[data-number="${min}"]`);

        console.log(proj);

        setDataImages(proj);
        setGallery();
}

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

        clearData();
        clearController();
}

function clearData () {
        object_project.block = undefined;
        object_project.number = 0;
        object_project.folder = '';
        object_project.images = [];
        object_project.position = 0;
}

function clearController () {
        controller.querySelector('.js-project-conten').innerHTML = '';
        controller.classList.add('_none');
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

function setDataImages (el) {
        object_project.block = el;
        object_project.number = object_project.block.dataset.number;
        object_project.folder = object_project.block.dataset.folder;
        let images = object_project.block.querySelectorAll('.js-grid__image');

        for (let i = 0; i < images.length; i++) {
                object_project.images.push(images[i].dataset.name);
        }
}

function setGallery () {
        showImage.innerHTML =
                `<img class="project__images" src="${object_project.folder}big/${object_project.images[0]}" />`;

        if (object_project.images.length > 1) {
                controller.classList.remove('_none');

                object_project.images.forEach((image, i) => {
                        let img = document.createElement('img');
                        img.className = `project__controller_image ${i == 0 ? 'project__controller_image_active' : ''} js-project__controller_image`;
                        img.src=`${object_project.folder}small/${image}`;
                        img.dataset.number = i;

                        document.querySelector('.js-project-conten').appendChild(img);
                })
        }
}

controller.addEventListener('click', (e) => {
         let target = e.target;

        if (target.classList.contains('js-controller-prev')) {
                prevImage();
        } else if (target.classList.contains('js-controller-next')) {
                nextImage();
        } else if (target.classList.contains('js-project__controller_image')) {
                checkImage(target);
        }
})

function checkImage (el) {
        object_project.position = el.dataset.number;

        changeImage();
}

function prevImage () {
        object_project.position -= 1;

        if (object_project.position < 0) object_project.position = object_project.images.length - 1;

        changeImage();
}

function nextImage () {
        object_project.position = +object_project.position + 1;

        if (object_project.position > object_project.images.length - 1) object_project.position = 0;

        changeImage();
}

function changeImage () {
        document.querySelector('.project__controller_image_active').classList.remove('project__controller_image_active');
        document.querySelectorAll('.js-project__controller_image')[object_project.position]
                .classList.add('project__controller_image_active');

        showImage.innerHTML =
                `<img class="project__images"
                        src="${object_project.folder}big/${object_project.images[object_project.position]}" />`;
}
