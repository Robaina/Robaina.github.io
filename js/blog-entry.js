// Global variables
let link_urls = [];
$.get("/blog/index.html", function (data) {
    $(data).find(".entry_link").each(function() {
      link_urls.push(this.href);
    });
});

// Control previous and next buttons
function goToNextPost(sense) {
  let current_entry = window.location.href;
  let current_entry_idx = link_urls.indexOf(current_entry);
  let next_url_idx = current_entry_idx + sense;
  if (next_url_idx >= 0 && next_url_idx < link_urls.length) {
    window.location.href = link_urls[next_url_idx];
  }
}

function disableNetxButton() {
  let current_entry = window.location.href;
  let current_entry_idx = link_urls.indexOf(current_entry);
  if (current_entry_idx === 0) {
    let left_button = document.getElementById("left-blog-navigator-button");
    left_button.style.visibility = "hidden";

  } else if (current_entry_idx === (link_urls.length - 1)) {
    let right_button = document.getElementById("right-blog-navigator-button");
    right_button.style.visibility = "hidden";
  }
}
window.onload = disableNetxButton;
