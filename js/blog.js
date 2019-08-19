/* I am not allowed to use server-side code on GitHub pages (only static pages), hence, there is no easy way to check for the existence of files or retrieve files from the project without throwing an error to console. As a workaround, I have created a JSON file containing the names of all the blog entries as well as some information such as whether they have a thumbnail image.*/

function writePostPreviews() {
  //Load text preview in blog entry thumbnail.
  let max_words = 35;
  let entry_links = document.getElementsByClassName("entry_link");

  for (let i=0; i < entry_links.length; i++) {
    let link = entry_links[i];
    let preview = $(link).find(".content_preview")[0];
    let start_idx = link.href.indexOf("blog");
    let href = link.href.slice(start_idx);

    $.get("/" + href + ".html", function (data) {
        data = $(data).find(".blog-content > p:first").text();
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

function createGridItems() {

  let grid = document.getElementById("grid_container");
  for (let entry of Object.values(blogEntries)) {

    let href = entry.name;
    let title = entry.title;
    let tagClasses = entry.tags;

    let tags = "";
    for (tag of tagClasses) {
      tags += `<div class="blogtag ${tag}">${tag}</div> `;
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
       <a class="entry_link" href="/blog/${href}">
        <div class="grid_item_content">
          <h1 class="grid_item_title">${title}</h1>
          <div id="tag-container">
            ${tags}
          </div>
          ${thumbnail}
          <p class="content_preview"></p>
        </div>
      </a>
    </div>`;

    $("#grid_container").append(template);
  }

  writePostPreviews();
}
