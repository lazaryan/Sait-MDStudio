 /**
  -webkit-background-clip: text Polyfill

  # What? #
  A polyfill which replaces the specified element with a SVG
  in browser where "-webkit-background-clip: text"
  is not available.

  Fork it on GitHub
  https://github.com/TimPietrusky/background-clip-text-polyfill

  # 2013 by Tim Pietrusky
  # timpietrusky.com
**/

Element.prototype.backgroundClipPolyfill = function () {
  var a = arguments[0],
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
    var a = arguments[0],
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
      'y' : 0,
      'dy' : '70%',
      'class' : `${a['class']} gggggg`,
      'style' : 'fill:url(#' + a.id + ');'
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
    var img = new Image();
    img.onload = function() {
      var svg = createSVG({
        'id' : a.patternID,
        'url' : a.patternURL,
        'class' : a['class'],
        'width' : this.width,
        'height' : this.height,
        'text' : el.textContent
      });

      el.parentNode.replaceChild(svg, el);
    }
    img.src = a.patternURL;
  }
};

let arh = document.querySelector('#arh_t');

/*
 * Call the polyfill
 *
 * patternID : the unique ID of the SVG pattern
 * patternURL : the URL to the background-image
 * class : the css-class applied to the SVG
 */
arh.backgroundClipPolyfill({
  'patternID' : 'mypattern',
  'patternURL' : '../img/start_menu/Arhitecture.jpg',
  'class' : 'start-nav__item_text'
});


let dis = document.querySelector('#dis_t');

dis.backgroundClipPolyfill({
  'patternID' : 'mypattern',
  'patternURL' : '../img/start_menu/Design.jpg',
  'class' : 'start-nav__item_text'
});

let vis = document.querySelector('#vis_t');

vis.backgroundClipPolyfill({
  'patternID' : 'mypattern',
  'patternURL' : '../img/start_menu/Design.jpg',
  'class' : 'start-nav__item_text'
});
