/* I am not allowed to use server-side code on GitHub pages (only static pages), hence, there is no easy way to check for the existence of files or retrieve files from the project without throwing an error to console. As a workaround, I have created a JSON file containing the names of all the blog entries as well as some information such as whether they have a thumbnail image.*/

const fs = require("fs");
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let $, window;
// const { window } = new JSDOM("");
// const { document } = (new JSDOM("")).window;
// global.document = document;
// const $ = jQuery = require('jquery')(window);


// JSDOM.fromFile("index.html").then(dom => {
//   // console.log(dom.serialize());
//   const { window } = dom;
//   const $ = require('jquery')(window);
//   // const { document } = dom.window;
//   console.log(document);
// });


const blogEntries = JSON.parse(
  fs.readFileSync("blog-entries.json")
);

function writePostPreviews() {
  //Load text preview in blog entry thumbnail.
  const max_words = 35;
  let entry_links = window.document.getElementsByClassName("entry_link");

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
  // let grid_container = document.getElementById(containerID);
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
    <div class="grid_item" id=${href} tabindex="0">
       <a class="entry_link" href="/blog/posts/${href}">
        <div class="grid_item_content">
          <div class="grid_item_header">
            <div class="grid_item_title">${title}</div>
            <div class="grid_item_date">${date}</div>
          </div>
          <div id="tag-container">
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

// let blogEntries;
// function createGridItems() {
//   $.getScript("/blog/blog-entries.json", function(result) {
//     blogEntries = JSON.parse(result);
//     let blogEntryValues = Object.values(blogEntries);
//     fillGridContainer(blogEntryValues, "grid_container");
//     writePostPreviews();
//     createTopicTagBanner(blogEntries);
//   });
// }

function createGridItems() {
  let blogEntryValues = Object.values(blogEntries);
  fillGridContainer(blogEntryValues, "grid_container");
  writePostPreviews();
  createTopicTagBanner(blogEntries);
}

function createTopicTagBanner(blogEntries) {
  let blogEntryValues = Object.values(blogEntries);
  let topicTags = ['All'];
  for (entry of blogEntryValues) {
    topicTags.push.apply(topicTags, entry.tags);
  }
  // Get only unique values
  topicTags = topicTags.filter(function(itm, i, topicTags) {
    return i == topicTags.indexOf(itm)
  });

  let tags = "";
  let setAll;
  for (tag of topicTags) {
    if (tag === "All") {
      setAll = "All";
    } else {
      setAll = "";
    }
    tags += `<div class="topic-banner-entry ${setAll}" onclick="filterBlogEntriesByTag(this)">${tag}</div>`;
  }

  $("#topic-tag-banner").append(tags);
}


// createGridItems();

JSDOM.fromFile("index.html").then(dom => {
  // console.log(dom.serialize());
  { window } = dom;
  $ = require('jquery')(window);
  // const { document } = dom.window;
  createGridItems();
  console.log(document);
});

// fs.readFile("index.html", 'utf8', function(err, data) {
//     if (err) {throw err}
//
//     jsdom.env(
//         data,
//         ["http://code.jquery.com/jquery.js"],
//         function (errors, window) {
//           let $ = window.jQuery;
//           createGridItems();
//         }
//       )
//   }
// )
