// Set active link in navbar
let navlinks = document.getElementsByClassName("navbar-item");
for (let i=0; i<navlinks.length; i++) {
  let link = navlinks[i];
  link.addEventListener("click", activateLink);
}

function activateLink(event) {
  // Remove active classes to all links
  let navlinks = document.getElementsByClassName("navbar-item");
  for (let i=0; i<navlinks.length; i++) {
    let link = navlinks[i];
    link.classList.remove("active-link");
  }
  // Add active class to selected link
  let elem = event.target || event.srcElement;
  elem.classList.add("active-link");
}
