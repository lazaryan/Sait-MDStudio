"use strict";

let images = document.querySelectorAll('img[data-src]');

for (let image of images) {
        image.setAttribute('src', image.dataset.src);
}
