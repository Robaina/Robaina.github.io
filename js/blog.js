// Load text preview in blog entry thumbnail
function writePostPreviews() {
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
