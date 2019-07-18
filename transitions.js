// Adjust to screen size
let loc_x, loc_y, scale_factor;
if (window.innerWidth < 768) {
  loc_x = window.innerWidth / 2.5;
  loc_y = window.innerHeight / 2.5;
  scale_factor = 5;
}
else if (window.innerWidth > 768) {
  loc_x = window.innerWidth / 2.2;
  loc_y = window.innerHeight / 2.2;
  scale_factor = 4;
}

// Animate page transitions
window.goToPage = function(href) {
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
    logo.width / scale_factor, logo.height / scale_factor);
  document.body.style.background = 'url(' + cnv2.toDataURL() + ')';

}
