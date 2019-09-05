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

// Change color of name characters
let char_color_timeouts = [];
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
  char_color_timeouts.push(setTimeout(function() {
    elem.style.color = regular_color;
  }, fading_time));
}

function returnRegularColorToCharacters() {
  for (timeout of char_color_timeouts) {
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

/* Get primary rols on load*/
const primary_rols = getPrimaryRols();
function getPrimaryRols() {
  let rol_container = document.getElementById("myrol-container");
  return rol_container.innerHTML.split(",");
}

let rol_timeout;
let rol_ready = true;
function changeRolKeywords() {

  if (rol_ready) {


    clearTimeout(rol_timeout);
    const fading_time = 3000;
    let additional_rols = ["human", "musician", "developer", "researcher",
                           "student", "writer", "reader", "cook", "composer",
                           "hiker"];
    let rand_idxs = getRandomSample(0, additional_rols.length - 1, 3);
    let rand_rols_array = extractSubArray(additional_rols, rand_idxs);
    let rand_rols_str = rand_rols_array.join(", ");
    let rol_container = document.getElementById("myrol-container");
    rol_container.innerHTML = rand_rols_str;

    rol_ready = false;
    rol_timeout = setTimeout(function() {
      rol_container.innerHTML = primary_rols;
      rol_ready = true;
    }, fading_time);

  }

}

function getRandomSample(minInt, maxInt, size) {
  /* Draw random sample of specified size, without repetition,
     from a sequence of numbers between minInt and maxInt
  */
  let numbers = []
  for (i = minInt; i < maxInt + 1; i++) {
    numbers.push(i);
  }
  randomSample = [];
  for (let i = 0; i < size; i++) {
    let sampledNumber = numbers.splice(
      Math.floor(Math.random() * numbers.length), 1)[0];
    randomSample.push(sampledNumber);
  }
  return randomSample
}

function extractSubArray(array, indices) {
  let subarray = [];
  for (idx of indices) {
    subarray.push(array[idx])
  }
  return subarray
}
