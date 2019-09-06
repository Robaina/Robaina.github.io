// Scroll-to-top arrow
window.addEventListener("scroll", showScrollToTopArrow);
// const arrowTopPos = document.getElementById("return-to-start-arrow").style.top;

function showScrollToTopArrow() {
  let scrollArrow = document.getElementById("return-to-start-arrow");
  let footerYpos = document.getElementById("footer").offsetTop;

  if (window.scrollY > 300) {
    scrollArrow.style.display = "block";
  } else {
      scrollArrow.style.display = "none";
  }
  // if ((window.scrollY + window.innerHeight) > footerYpos) {
  //   scrollArrow.style.position = "absolute";
  //   scrollArrow.style.top = (footerYpos - 43) + "px";
  // } else {
  //   scrollArrow.style.position = "sticky" + arrowTopPos + "px";
  //   // scrollArrow.style.top = arrowTopPos + "px";
  // }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

// getComputedStyle(document.documentElement)
    // .getPropertyValue('--my-variable-name');
