// Deploy artwork
let cnv, ctx, stars_color, sky_color;
// document.body.style["background-color"] = getComputedStyle(
//   document.documentElement).getPropertyValue('--BackgroundColor');

function deployArtWork() {
  sky_color = getComputedStyle(
    document.documentElement).getPropertyValue('--BackgroundColor');
  stars_color = getComputedStyle(
    document.documentElement).getPropertyValue('--FontColor');

  cnv = document.createElement('canvas');
  ctx = cnv.getContext('2d');

  // Use this to set canvas background color
  cnv.setAttribute('width', window.innerWidth);
  cnv.setAttribute('height', window.innerHeight);
  ctx.fillStyle = sky_color;
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  makeStars(density=0.0001);
  // Set document background to canvas image
  document.body.style["background-image"] = 'url(' + cnv.toDataURL() + ')';

}

function makeStars(density=0.75, min_size=1, max_size=3) {
  for( let x = 0; x < cnv.width; x++ ){
      for( let y = 0; y < cnv.height; y++ ){
          if( Math.random() < density) {
            //ctx.fillStyle = 'hsl(0, 0%, ' + ( 100 - ( Math.random() * 15 ) ) + '%)';
            ctx.fillStyle = stars_color;
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

deployArtWork();

// Change color of name characters
let timeouts = [];
let fading_time = 5000;
let colors = ["rgb(80, 189, 58)", "rgb(214, 174, 55)", "rgb(212, 102, 68)",
              "rgb(34, 167, 155)", "rgb(187, 61, 163)", "rgb(57, 95, 208)",
              "rgb(113, 14, 212)"];
let characters = document.getElementsByClassName("name-character");
for (let i=0; i<characters.length; i++) {
  let char = characters[i];
  char.addEventListener("mouseover", changeCharacterColor);
}

function changeCharacterColor(event) {
  let regular_color = getComputedStyle(document.documentElement)
      .getPropertyValue('--FontColor');
  let rand_color = colors[Math.floor(Math.random() * colors.length)];
  let elem = event.target || event.srcElement;
  elem.style.color = rand_color;
  timeouts.push(setTimeout(function() {
    elem.style.color = regular_color;
  }, fading_time));
}

function returnRegularColorToCharacters() {

  for (timeout of timeouts) {
    clearTimeout(timeout);
  }
  let characters = document.getElementsByClassName("name-character");
  let regular_color = getComputedStyle(document.documentElement)
      .getPropertyValue('--FontColor');
  for (let i=0; i<characters.length; i++) {
    let char = characters[i];
    char.style.color = regular_color;
  }
}
