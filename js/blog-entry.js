// Global variables
let link_urls = [];
let current_entry, current_entry_idx;

function initializeBlogNavigator() {
  $.get("/blog/index.html", function (data) {
      $(data).find(".entry_link").each(function() {
        link_urls.push(this.href);
        console.log(link_urls);
      });

      current_entry = window.location.href;
      current_entry_idx = link_urls.indexOf(current_entry);

      if (current_entry_idx === 0) {
        let left_button = document.getElementById("left-blog-navigator-button");
        left_button.style.visibility = "hidden";
      } else if (current_entry_idx === (link_urls.length - 1)) {
          let right_button = document.getElementById("right-blog-navigator-button");
          right_button.style.visibility = "hidden";
      }

  });
}

// Control previous and next buttons
function goToNextPost(sense) {
  let next_url_idx = current_entry_idx + sense;
  if (next_url_idx >= 0 && next_url_idx < link_urls.length) {
    window.location.href = link_urls[next_url_idx];
  }
}

$(initializeBlogNavigator);
