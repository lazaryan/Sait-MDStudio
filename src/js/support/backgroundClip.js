Element.prototype.backgroundClipPolyfill = function () {
    let a = arguments[0],
        d = document,
        b = d.body,
        el = this;

    function hasBackgroundClip() {
        return b.style.webkitBackgroundClip != undefined;
    };

    function addAttributes(el, attributes) {
        for (var key in attributes) {
        el.setAttribute(key, attributes[key]);
        }
    }

    function createSvgElement(tagname) {
        return d.createElementNS('http://www.w3.org/2000/svg', tagname);
    }

    function createSVG() {
        let a = arguments[0],
            svg = createSvgElement('svg'),
            pattern = createSvgElement('pattern'),
            image = createSvgElement('image'),
            text = createSvgElement('text');

    // Add attributes to elements
    addAttributes(pattern, {
        'id' : a.id,
        'patternUnits' : 'userSpaceOnUse',
        'width' : a.width,
        'height' : a.height
    });

    addAttributes(image, {
        'width' : a.width,
        'height' : a.height
    });
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', a.url);

    addAttributes(text, {
        'x' : '10%',
        'y' : '70%',
        'class' : a.class,
        'style' : `fill:url(#${a.id});`
    });

    // Set text
    text.textContent = a.text;

    // Add elements to pattern
    pattern.appendChild(image);

    // Add elements to SVG
    svg.appendChild(pattern);
    svg.appendChild(text);

    return svg;
  };

  /*
   * Replace the element if background-clip
   * is not available.
   */
    if (!hasBackgroundClip()) {
        let img = new Image();
        img.onload = function() {
            let svg = createSVG({
                'id' : a.patternID,
                'url' : a.patternURL,
                'class' : a.class,
                'width' : this.width,
                'height' : this.height,
                'text' : el.textContent
            });

            el.parentNode.replaceChild(svg, el);
        }
        img.src = a.patternURL;
    }
};

let el = document.querySelectorAll('.main__link_text');

for(let i = 0; i < el.length; i++) {
    el[i].backgroundClipPolyfill({
        'patternID' : el[i].getAttribute('id'),
        'patternURL' : el[i].dataset.src,
        'class' : 'main__link_text'
    });
};
