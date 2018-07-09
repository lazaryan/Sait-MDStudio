/*стартовое меню*/
let start_nav = document.querySelector('.js-start-nav');

start_nav.addEventListener("click", function (item)  {
        let id = item.target.parentNode.getAttribute('id');
        if(id){
                start_nav.classList.add('js-start-nav_none');

                let childs      = start_nav.children;
                let count       = 0;

                for(let i = 0; i < childs.length; i++) {
                        count++;
                        (count % 2 == 1) ? childs[i].classList.add('js-start-nav_none-l') : childs[i].classList.add('js-start-nav_none-r');
                }

                let block = document.getElementById('content_' + id);
                block.classList.remove('_none');
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
                        let content    = document.querySelectorAll('.content');
                        content.forEach(function (item) {
                                item.classList.add('_none');
                        });

                        let block = document.getElementById('content_' + value);

                        block.classList.remove('_none');

                        if(value == 'project'){
                                startMasonry();
                        }
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
        let src = document.querySelector('#project_item-' + id).getAttribute('src');
        document.querySelector('.js-project__popup_img-i').setAttribute('src', src);

        document.querySelector('.js-project__popup_number-img').innerHTML = +id;
}

popup.addEventListener('click', function(elem) {
        let target = elem.target;
        let images = document.querySelectorAll('.js-grid__item_img');

        let id_min = images[0].getAttribute('id');
        let id_max = images[images.length - 1].getAttribute('id');

        id_min = +id_min.substring(id_min.indexOf('-') + 1, id_min.length);
        id_max = +id_max.substring(id_max.indexOf('-') + 1, id_max.length);

        console.log(id_min, id_max);


        if(target.classList.contains('js-project__popup_close')){
                popup.classList.remove('_show');
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
})

/*let gal = new Gallery({
        el: '.js-grid_project',
        items: '.js-grid__item_img'
})*/
