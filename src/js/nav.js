;let navBurger  = document.querySelector('#navBurger');
let nav         = document.querySelector('#nav');
let content     = document.querySelector('#main');

navBurger.addEventListener('click', (e) => {
        e.preventDefault();
        toogleMenu();
});

nav.addEventListener('click', (el) => {
        el = el.target;

        if(el.classList.contains('js-nav__item')) toogleMenu();
}, false);

content.addEventListener('click', () => hideMenu());

function toogleMenu () {
        nav.classList.toggle('nav_active');
        navBurger.classList.toggle('nav__burger_active');
}

function hideMenu () {
        nav.classList.remove('nav_active');
        navBurger.classList.remove('nav__burger_active');
}
