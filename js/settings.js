// Change color mode
let light_mode_selected;
let light_color_mode = {};
let dark_color_mode = {};
let properties = ["GridItemColor", "BackgroundColor", "FontColor",
                  "FancyColor", "EmphFontColor", "NavBarColor"];

for (property of properties) {
  light_color_mode["--" + property] = getComputedStyle(
    document.documentElement).getPropertyValue("--" + "LightMode"
    + property);
  dark_color_mode["--" + property] = getComputedStyle(
    document.documentElement).getPropertyValue("--" + "DarkMode"
    + property);
}

sky_color = getComputedStyle(
  document.documentElement).getPropertyValue('--BackgroundColor');

function selectLightMode() {
  window.sessionStorage.lightModeSelected = true;
  // stores boolean as string!
  setColorMode();
}

function selectDarkMode() {
  window.sessionStorage.lightModeSelected = false;
  // stores boolean as string!
  setColorMode();
}

function setColorMode() {
  let page_name = window.location.pathname.split("/").pop().split(".html")[0];
  let is_home_page = page_name === "home";
  let is_contact_page = page_name === "contact";
  let is_blog_post = window.location.pathname.includes("blog/posts");
  light_mode_selected = window.sessionStorage.lightModeSelected === "true";

  if (light_mode_selected) {
    for (key in light_color_mode) {
        document.documentElement.style
        .setProperty(key, light_color_mode[key]);
    }
  } else {
    for (key in dark_color_mode) {
        document.documentElement.style
        .setProperty(key, dark_color_mode[key]);
    }
  }
  if (is_home_page) {
    deployArtWork();
    returnRegularColorToCharacters();
  }
  if (is_contact_page) {
    setRightLogosForColorMode();
  }
  if (is_blog_post) {
    loadHighlightJSStyles(light_mode_selected);
  }
  hideSettingsOptions();
  settings_expanded = !settings_expanded;
}

function loadHighlightJSStyles(lightMode=false) {
  let link=document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  if (lightMode) {
    link.setAttribute("href", "/vendor/highlight_js/styles/atom-one-light.css");
  } else {
      link.setAttribute("href", "/vendor/highlight_js/styles/tomorrow-night.css");
  }
  document.getElementsByTagName("head")[0].appendChild(link);
}

let settings_expanded = true;
function expandSettingsOptions() {
  settings_expanded = !settings_expanded;
  if (settings_expanded) {
    showSettingsOptions();
  } else {
    hideSettingsOptions();
  }
}

function hideSettingsOptions() {
  let settings_items = document.getElementsByClassName("settings-item");
  let icon_rotation_angle = getComputedStyle(
    document.documentElement).getPropertyValue("--IconRotationAngle");
  for (let i=0; i<settings_items.length; i++) {
    settings_items[i].style.display = "none";
  }
  document.documentElement.style
    .setProperty("--IconRotationAngle", icon_rotation_angle.split("-").pop());
}

function showSettingsOptions() {
  let settings_items = document.getElementsByClassName("settings-item");
  let icon_rotation_angle = getComputedStyle(
    document.documentElement).getPropertyValue("--IconRotationAngle");
  for (let i=0; i<settings_items.length; i++) {
    settings_items[i].style.display = "inline-block";
  }
  let neg_angle = ("-" + icon_rotation_angle).replace(" ", "");
  document.documentElement.style
    .setProperty("--IconRotationAngle", neg_angle);
}

function setRightLogosForColorMode() {
   let github_img = document.getElementById("github-logo");
   if (light_mode_selected) {
      github_img.src = "/imgs/github_icon_dark.png";
   } else {
      github_img.src = "/imgs/github_icon_light.png";
   }

}

function setTopicTag() {
  let tags = document.getElementsByClassName("topictag");
  for (let i=0; i<tags.length; i++) {
    let tagName = tags[i].classList[1];
    tags[i].innerHTML = tagName;
  }
}

function changeNavBarColorOnScrollDown() {

  const is_landscape_oriented = window.innerWidth > window.innerHeight;
  const is_mobile = window.innerWidth <= 768;
  let navbar = document.getElementById("navbar-container");
  let navbarSeparator = document.getElementById("navbar-line-separator");

  if (is_mobile && !is_landscape_oriented && navbarSeparator !== null) {
    navbarSeparator.style.display = "none";
  }

  if (navbar !== null && navbarSeparator !== null) {
    if (window.scrollY > 100) {
      navbar.style["background-color"] = "var(--NavBarColor)";
      navbarSeparator.style.display = "none";
    } else {
      navbar.style["background-color"] = "var(--BackgroundColor)";
      if (!is_mobile || (is_mobile && is_landscape_oriented)) {
        navbarSeparator.style.display = "block";
      }
    }
  }
}

setColorMode();
window.addEventListener("scroll", changeNavBarColorOnScrollDown);
window.addEventListener("resize", changeNavBarColorOnScrollDown);
