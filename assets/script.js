// Set active link in navbar
// let navlinks = document.getElementsByClassName("navbar-item");
// for (let i=0; i<navlinks.length; i++) {
//   let link = navlinks[i];
//   link.addEventListener("click", activateLink);
// }
//
// function activateLink(event) {
//   // Remove active classes to all links
//   let navlinks = document.getElementsByClassName("navbar-item");
//   for (let i=0; i<navlinks.length; i++) {
//     let link = navlinks[i];
//     link.classList.remove("active-link");
//   }
//   // Add active class to selected link
//   let elem = event.target || event.srcElement;
//   elem.classList.add("active-link");
// }

// Animate page transitions
window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() {
        window.location.href = href
    }, 500)
};

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
});
