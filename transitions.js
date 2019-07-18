let loc_x, loc_y, scale_factor;

// Animate page transitions
window.goToPage = function(href) {

  // Adjust logo to screen size
  let portrait_oriented = window.matchMedia("(orientation: portrait)").matches

  if (window.innerWidth < 768) {

    if (portrait_oriented) {
       loc_x = window.innerWidth / 2.5;
    } else {
       loc_x = window.innerWidth / 2.2;
    }
    loc_y = window.innerHeight / 2.5;
    scale_factor = 1/6;
  }
  else if (window.innerWidth > 768) {
    loc_x = window.innerWidth / 2.2;
    loc_y = window.innerHeight / 2.2;
    scale_factor = 1/4;
  }

  document.querySelector('body').style.opacity = 0;
  draw_logo();
  setTimeout(function() {
      window.location.href = href;
  }, 800)
};

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1;
});

function draw_logo() {
  // Draws logo over default background color
  let backgroundColor = getComputedStyle(
    document.documentElement).getPropertyValue('--backgroundColor');

  let cnv2 = document.createElement('canvas');
  let ctx2 = cnv2.getContext('2d');
  cnv2.setAttribute('width', window.innerWidth);
  cnv2.setAttribute('height', window.innerHeight);
  ctx2.fillStyle = backgroundColor;
  ctx2.fillRect(0, 0, cnv2.width, cnv2.height);

  ctx2.drawImage(logo, loc_x, loc_y,
    scale_factor * logo.width, scale_factor * logo.height);
  document.body.style.background = 'url(' + cnv2.toDataURL() + ')';

}
