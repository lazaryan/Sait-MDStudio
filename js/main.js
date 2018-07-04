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
                                console.log('aaaa');
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
