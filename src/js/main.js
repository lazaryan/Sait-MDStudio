;let main_nav = document.querySelector('#main');

main_nav.addEventListener('click', (el) => {
    let target = el.target;

    if(target.classList.contains('main__link_text')){
        hideStartMenu();
        return true;
    }
});

function hideStartMenu () {
    let childs = main_nav.children;

    for(let i = 0; i < childs.length; i++) {
        if(i % 2 == 1) childs[i].classList.add('main__link_left'); else childs[i].classList.add('main__link_right');
    }
};
