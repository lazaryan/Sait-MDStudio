/*стартовое меню*/
let start_nav = document.querySelector('.js-start-nav');

start_nav.addEventListener("click", function (item)  {
        let target = item.target;
        let id;

        while((target = target.parentNode) && !(id = target.getAttribute('id')));

        if(id){
                hidePreloader();
                start_nav.classList.add('js-start-nav_none');

                setTimeout(function () {
                        let childs      = start_nav.children;
                        let count       = 0;

                        for(let i = 0; i < childs.length; i++) {
                                count++;
                                (count % 2 == 1) ? childs[i].classList.add('js-start-nav_none-l') : childs[i].classList.add('js-start-nav_none-r');
                        }

                        let block = document.getElementById('content_' + id);
                        block.classList.remove('_none');
                }, 2000);

                showPreloader();
        }
});

/*меню*/
let main_nav    = document.querySelector('.js-nav_click');

main_nav.addEventListener('click', showMenu);

let content     = document.querySelectorAll('.content');
let nav         = document.querySelectorAll('.js-nav__item-link');

nav.forEach((el) => {
        el.addEventListener('click', function (item)  {
                let value = item.target.dataset.value;

                if(value == "home"){
                        hideContent();
                }else{
                        hidePreloader();
                        let content    = document.querySelectorAll('.content');
                        content.forEach(function (item) {
                                item.classList.add('_none');
                        });

                        setTimeout(function () {
                                let block = document.getElementById('content_' + value);

                                block.classList.remove('_none');

                                if(value == 'project'){
                                        startMasonry();
                                }
                        }, 4000);

                        showPreloader();
                }

                showMenu();
        })
});

content.forEach((el) => {
        el.addEventListener('click', function ()  {
                let nav = document.querySelector('.js-nav');

                if(nav.classList.contains('nav_active'))
                        showMenu();
        })
});

function showMenu(){
        let nav = document.querySelector('.js-nav');
        nav.classList.toggle('nav_active');

        let sp = main_nav.querySelector('.js-nav_click__line');
        sp.classList.toggle('nav_click__line_active');

        main_nav.classList.toggle('nav_click_active');
}

function hideContent(){
        content.forEach( function (item) {
                item.classList.add('_none');
        })

        start_nav.classList.remove('js-start-nav_none');

        let childs      = start_nav.children;
        let count       = 0;

        for(let i = 0; i < childs.length; i++) {
                count++;
                (count % 2 == 1) ? childs[i].classList.remove('js-start-nav_none-l') : childs[i].classList.remove('js-start-nav_none-r');
        }
}

/*Проекты*/
function startMasonry(){
        let msnry = new Masonry('.js-grid', {
                itemSelector: '.js-grid__item',
                columnWidth: '.js-grid__item',
                percentPosition: true
        });
}

let projects = document.querySelector('.js-grid_project');

projects.addEventListener('click', function (elem) {
        let target = elem.target;

        if(target.classList.contains('js-grid__item_img')){
                let id = target.getAttribute('id');

                id = +id.substring(id.indexOf('-') + 1, id.length);
                showPopUpProgect(id);
        }
});
let popup = document.querySelector('.js-project__popup');

function showPopUpProgect (id) {
        popup.classList.add('_show');

        showPopUpImage(id);
}

function showPopUpImage(id) {
        let proj = document.querySelector('#project_item-' + id);
        let src = proj.getAttribute('src');
        document.querySelector('.js-project__popup_img-i').setAttribute('src', src);

        document.querySelector('.js-project__popup_number-img').innerHTML = +id;

        let images = proj.parentNode.querySelectorAll('.js-grid__item_img');

        if(images.length > 1){
                document.querySelector('.js-project__popup_scroll').classList.remove('_none');

                let scroll = '';
                scroll +=       '<div class="project__popup_scroll__prev js-project__popup_scroll__prev">' +
                                        '<span class="project__popup_scroll__prev_line js-project__popup_scroll__prev"></span>' +
                                '</div>';

                scroll += '<div class="project__popup_scroll__item">'+
                                        '<img class="project__popup_scroll__item_img js-project__popup_scroll__item_img project__popup_scroll__item_img_active" src="'+ images[0].src +'" data-number="'+ 0 +'"/>' +
                                '</div>';

                for(let i = 1; i< images.length; i++) {
                        scroll += '<div class="project__popup_scroll__item">'+
                                        '<img class="project__popup_scroll__item_img js-project__popup_scroll__item_img" src="'+ images[i].src +'" data-number="'+ i +'"/>' +
                                '</div>';
                }

                scroll +=       '<div class="project__popup_scroll__next js-project__popup_scroll__next">' +
                                        '<span class="project__popup_scroll__next_line js-project__popup_scroll__next"></span>' +
                                '</div>';

                document.querySelector('.js-project__popup_scroll-i').innerHTML = scroll;
        }else{
                document.querySelector('.js-project__popup_scroll').classList.add('_none');
        }
}

popup.addEventListener('click', function(elem) {
        let target = elem.target;
        let images = document.querySelectorAll('.js-grid__item_img');

        let id_min = images[0].getAttribute('id');
        let id_max = images[images.length - 1].getAttribute('id');

        id_min = +id_min.substring(id_min.indexOf('-') + 1, id_min.length);
        id_max = +id_max.substring(id_max.indexOf('-') + 1, id_max.length);


        if(target.classList.contains('js-project__popup_close')){
                popup.classList.remove('_show');
                document.querySelector('.js-project__popup_scroll').classList.add('_none');
        }

        if(target.classList.contains('js-project__popup_prev')){
                let id = +document.querySelector('.js-project__popup_number-img').innerHTML;

                if(id != id_min)
                        showPopUpImage(id - 1);
                else
                        showPopUpImage(id_max);
        }

         if(target.classList.contains('js-project__popup_next')){
                let id = +document.querySelector('.js-project__popup_number-img').innerHTML;

                if(id != id_max)
                        showPopUpImage(id + 1);
                else
                        showPopUpImage(id_min);
        }

        if(target.classList.contains('js-project__popup_scroll__item_img')){
                document.querySelector('.js-project__popup_img-i').setAttribute('src', target.src);
                target.parentNode.parentNode.querySelector('.project__popup_scroll__item_img_active').classList.remove('project__popup_scroll__item_img_active');
                target.classList.add('project__popup_scroll__item_img_active');
        }

        if(target.classList.contains('js-project__popup_scroll__prev')){
                let images = document.querySelectorAll('.js-project__popup_scroll__item_img');

                let id_min = +images[0].dataset.number;
                let id_max = +images[images.length - 1].dataset.number;

                let id = +document.querySelector('.project__popup_scroll__item_img_active').dataset.number;
                let new_img;

                if(id != id_min){
                        new_img = document.querySelector('.project__popup_scroll__item_img[data-number="' + (id - 1) +'"]');
                }else{
                        new_img = document.querySelector('.project__popup_scroll__item_img[data-number="' + id_max +'"]');
                }

                new_img.classList.add('project__popup_scroll__item_img_active');
                document.querySelector('.project__popup_scroll__item_img[data-number="' + id +'"]').classList.remove('project__popup_scroll__item_img_active');
                document.querySelector('.js-project__popup_img-i').setAttribute('src', new_img.src);
        }

        if(target.classList.contains('js-project__popup_scroll__next')){
                let images = document.querySelectorAll('.js-project__popup_scroll__item_img');

                let id_min = +images[0].dataset.number;
                let id_max = +images[images.length - 1].dataset.number;

                let id = +document.querySelector('.project__popup_scroll__item_img_active').dataset.number;
                let new_img;

                console.log('aaaaa ', id_min, id_max, id);

                if(id != id_max){
                        new_img = document.querySelector('.project__popup_scroll__item_img[data-number="' + (id + 1) +'"]');
                }else{
                        new_img = document.querySelector('.project__popup_scroll__item_img[data-number="' + id_min +'"]');
                }

                new_img.classList.add('project__popup_scroll__item_img_active');
                document.querySelector('.project__popup_scroll__item_img[data-number="' + id +'"]').classList.remove('project__popup_scroll__item_img_active');
                document.querySelector('.js-project__popup_img-i').setAttribute('src', new_img.src);
        }
});

/*прелоадер*/
function showPreloader() {
        setTimeout(function () {
                let preloader = document.querySelector('.js-preloader')
                preloader.classList.add('preloader_fadeout');
                preloader.classList.remove('preloader_fadein');

                document.querySelector('#preloader-svg').classList.remove('preloader__logo-svg');
        }, 4000);
}

function hidePreloader() {
        let preloader = document.querySelector('.js-preloader');
        document.querySelector('#preloader-svg').classList.add('preloader__logo-svg');
        preloader.classList.add('preloader_fadein');
        preloader.classList.remove('preloader_fadeout');
}

window.onload = function () {
        showPreloader();
}
