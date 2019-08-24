// Global variables
let link_urls = [];
let current_entry, current_entry_idx;
let max_number_suggested_posts = 3;

function setPostDate() {
  let dateContainer = document.getElementById("entry-date");
  if (dateContainer.innerHTML === "") {
    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', {month: 'long'});
    let current_date = day + " " + month + ", " + year;
    dateContainer.innerHTML = current_date;
  }
}

// Control previous and next buttons
function goToNextPost(sense) {
  let next_url_idx = current_entry_idx + sense;
  if (next_url_idx >= 0 && next_url_idx < link_urls.length) {
    window.location.href = link_urls[next_url_idx];
  }
}

// Suggested readings section
function writePostPreviews() {
  //Load text preview in blog entry thumbnail.
  const max_words = 35;
  let entry_links = document.getElementsByClassName("entry_link");

  for (let i=0; i < entry_links.length; i++) {
    let link = entry_links[i];
    let preview = $(link).find(".content_preview")[0];
    let start_idx = link.href.indexOf("blog");
    let href = link.href.slice(start_idx);

    $.get("/" + href + ".html", function (data) {
        data = $(data).find("#blog-content > p:first").text();
        let preview_text = trimPreviewText(data, max_words) + "...";
        preview.innerHTML = preview_text;
    });
  }
}

function trimPreviewText(text_string, n_words) {
    let words = text_string.split(" ");
    let trim_text;
    if (words.length > n_words) {
        trim_text = words.slice(0, n_words).join(" ");
    } else {
        trim_text = words.join(" ");
    }
    return trim_text
}

function fillGridContainer(blogEntryValues, containerID) {
  for (let entry of blogEntryValues) {

    let href = entry.name;
    let title = entry.title;
    let date = entry.date;
    let tagClasses = entry.tags;

    let tags = "";
    for (tag of tagClasses) {
      tags += `<div class="topictag ${tag}">${tag}</div> `;
    }

    let thumbnail;
    let img_href = `/imgs/blog/${href}.png`;
    let img_template = `<img class="thumbnail" src="${img_href}" alt="Responsive image">`;

    if (entry.hasThumbnail) {
      thumbnail = img_template;
    } else {
      thumbnail = "";
    }

    let template = `
    <div class="grid_item" tabindex="0">
       <a class="entry_link" href="/blog/posts/${href}">
        <div class="grid_item_content">
          <div class="grid_item_header">
            <div class="grid_item_title">${title}</div>
            <div class="grid_item_date">${date}</div>
          </div>
          <div class="tag-container">
            ${tags}
          </div>
          ${thumbnail}
          <p class="content_preview"></p>
        </div>
      </a>
    </div>`;

    $("#" + containerID).append(template);
  }

}

function addSuggestedReadings(max_suggested=3) {
  let entry_tags = [];
  let tag_elems = document.getElementsByClassName("topictag");
  for (let i=0; i<tag_elems.length; i++) {
    entry_tags.push(tag_elems.item(i).classList[1]);
  }

  $.getScript("/blog/blog-entries.json", function(result) {
    let blogEntries = JSON.parse(result);
    let blogEntryValues = Object.values(blogEntries);

    let filteredEntryValues;
    let current_post_url = window.location.href.split(
      "/").pop().split(".html")[0];
    // List all posts which contain at least one of the current topics
    filteredEntryValues = blogEntryValues.filter(function(value) {
      return (value.tags.some(tag => entry_tags.includes(tag))
              & value.name !== current_post_url)
    });

    let n_filtered_entries = filteredEntryValues.length;
    // If more than max_suggested entries, suggest a random sample
    if (n_filtered_entries > max_suggested) {
      let random_idxs = getRandomSample(0, n_filtered_entries-1, max_suggested);
      filteredEntryValues = extractSubArray(filteredEntryValues, random_idxs);
    }
    // Deploy suggested readings, if any
    if (filteredEntryValues.length > 0) {
      document.getElementById("suggested-readings").style.display = "block";
      fillGridContainer(filteredEntryValues, "suggested-readings-grid");
      writePostPreviews();
    }

  });

}

function getRandomSample(minInt, maxInt, size) {
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

  setPostDate()
  setTopicTag();
  addSuggestedReadings(max_number_suggested_posts);
}

$(initializeBlogEntry);
