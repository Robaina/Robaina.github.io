// Global variables
let link_urls = [];
let current_entry, current_entry_idx;

function initializeBlogEntry() {

  $.getScript("/blog/blog-entries.json", function(result) {

    let blogEntries = JSON.parse(result);
    for (let entry of blogEntries) {
       link_urls.push(entry.name);
     }

     current_entry = window.location.href.split("/").pop();
     current_entry_idx = link_urls.indexOf(current_entry);

     if (current_entry_idx === 0) {
       let left_button = document.getElementById("left-blog-navigator-button");
       left_button.style.visibility = "hidden";
     } else if (current_entry_idx === (link_urls.length - 1)) {
         let right_button = document.getElementById("right-blog-navigator-button");
         right_button.style.visibility = "hidden";
     }

  });

  setTopicTag();
}

// Control previous and next buttons
function goToNextPost(sense) {
  let next_url_idx = current_entry_idx + sense;
  if (next_url_idx >= 0 && next_url_idx < link_urls.length) {
    window.location.href = link_urls[next_url_idx];
  }
}

$(initializeBlogEntry);

// Suggested readings section
function addSuggestedReadings() {
  
}
