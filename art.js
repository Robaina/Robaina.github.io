// Set background to canvas
let sky_color = getComputedStyle(
  document.documentElement).getPropertyValue('--backgroundColor');
let cnv = document.createElement('canvas');
let ctx = cnv.getContext('2d');

// Use this to set canvas background color
cnv.setAttribute('width', window.innerWidth);
cnv.setAttribute('height', window.innerHeight);
ctx.fillStyle = sky_color;
ctx.fillRect(0, 0, cnv.width, cnv.height);

makeStars(density=0.0001);
document.body.style.background = 'url(' + cnv.toDataURL() + ')';

function makeStars(density=0.75, min_size=1, max_size=3) {
  for( let x = 0; x < cnv.width; x++ ){
      for( let y = 0; y < cnv.height; y++ ){
          if( Math.random() < density) {
            ctx.fillStyle = 'hsl(0, 0%, ' + ( 100 - ( Math.random() * 15 ) ) + '%)';
            let r = randomExponential(gamma=0.8);
            let star_size = (max_size - min_size) * r + min_size
            ctx.beginPath();
            ctx.ellipse(x, y, star_size, star_size, 0, 0, 2 * Math.PI);
            ctx.fill();
          }
      }
  }
}

function randomExponential(gamma=1) {
  	/*
    Get random number from negative exponential distribution
    */
  return (1 - Math.E**(-gamma*Math.random()))
}

// Change color of name characters
let colors = ["rgb(94, 217, 69)", "rgb(250, 198, 44)", "rgb(246, 113, 71)",
              "rgb(51, 215, 201)", "rgb(217, 69, 189)", "rgb(71, 114, 241)",
              "rgb(132, 22, 242)"];
let regular_color = getComputedStyle(document.documentElement)
    .getPropertyValue('--FontColor');

let characters = document.getElementsByClassName("name-character");
for (let i=0; i<characters.length; i++) {
  let char = characters[i];
  char.addEventListener("mouseover", changeColor);
}

function changeColor(event) {
  let rand_color = colors[Math.floor(Math.random() * colors.length)];
  let elem = event.target || event.srcElement;
  elem.style.color = rand_color;
  setTimeout(function() {
    elem.style.color = regular_color;
  }, 5000);
}
