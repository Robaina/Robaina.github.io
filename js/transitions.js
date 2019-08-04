let loc_x, loc_y, scale_factor;
let transition_time = 700;

// Animate page transitions
window.goToPage = function(href) {

  /* Home takes time to load due to the name divs, increase opacity transition
     time to hide the screen flash while loading */
  let page_name = href.split("/").pop().split(".html")[0];
  let is_home_page = page_name === "home";
  let is_contact_page = page_name === "contact";
  let light_mode_selected = window.sessionStorage.lightModeSelected === "true";
  if ((is_home_page || is_contact_page) && light_mode_selected) {
    document.querySelector('body').style.transition = "opacity 1.6s";
  }

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
    loc_y = window.innerHeight / 2.4;
    scale_factor = 1/4;
  }

  document.querySelector('body').style.opacity = 0;
  if (window.scrollY > 0) {
    window.scrollTo(0, 0);
    setTimeout(function() {
      draw_logo();
    }, 300);
  } else {
    draw_logo();
  }

  setTimeout(function() {
      window.location.href = href;
  }, transition_time);

};

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1;
});

function draw_logo() {
  // Draws logo over default background color
  let backgroundColor = getComputedStyle(
    document.documentElement).getPropertyValue('--BackgroundColor');

  let cnv2 = document.createElement('canvas');
  let ctx2 = cnv2.getContext('2d');
  cnv2.setAttribute('width', window.innerWidth);
  cnv2.setAttribute('height', window.innerHeight);
  ctx2.fillStyle = backgroundColor;
  ctx2.fillRect(0, 0, cnv2.width, cnv2.height);

  ctx2.drawImage(logo, loc_x, loc_y,
    scale_factor * logo.width, scale_factor * logo.height);

  document.body.style["background-image"] = 'url(' + cnv2.toDataURL() + ')';

}
