// Change color mode
let light_mode_selected;
let light_color_mode = {};
let dark_color_mode = {};
let properties = ["BackgroundColor", "FontColor", "FancyColor"];

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
  let page_name = window.location.pathname.split("/").pop();
  let is_home_page = page_name === "home.html";
  let is_contact_page = page_name === "contact.html";
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

  hideSettingsOptions();
}

function hideSettingsOptions() {
  let settings_items = document.getElementsByClassName("settings-item");
  for (let i=0; i<settings_items.length; i++) {
    settings_items[i].style.display = "none";
  }
}

function showSettingsOptions() {
  let settings_items = document.getElementsByClassName("settings-item");
  for (let i=0; i<settings_items.length; i++) {
    settings_items[i].style.display = "inline-block";
  }
}

function setRightLogosForColorMode() {
   let github_img = document.getElementById("github-logo");
   if (light_mode_selected) {
      github_img.src = "/imgs/github_icon_dark.png";
   } else {
      github_img.src = "/imgs/github_icon_light.png";
   }

}

setColorMode();
