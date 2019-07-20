// Provisional: change color mode
let light_mode_selected;
let light_color_mode = {
  "--BackgroundColor": "rgb(205, 205, 205)",
  "--FontColor": "rgb(0, 0, 0)",
  "--FancyColor": "rgb(13, 79, 185)"
};
let dark_color_mode = {
  "--BackgroundColor": "rgb(0, 0, 0)",
  "--FontColor": "rgb(189, 189, 189)",
  "--FancyColor": "rgb(73, 201, 35)"
};

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
  }
  if (is_contact_page) {
    setRightLogosForColorMode();
  }
  // Hide settings options: does not work, prevents items to appear again...
  // let settings_items = document.getElementsByClassName("settings-item");
  // for (let i=0; i<settings_items.length; i++) {
  //   settings_items[i].style.display = "none";
  // }
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
