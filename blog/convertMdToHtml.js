/*
 Load markdown file and convert it to html using markdown-it
*/
let result;
let md = require('markdown-it')({
    html: true,
    langPrefix: "",
});

// let md_file = process.argv[0];
let fs = require('fs');
fs.readFile('temp.md', 'utf8', (err, data) => {
    result = md.render(data);

    fs.writeFile('temp.html', result, function (err) {
        if (err) throw err;
        //console.log('Replaced!');
        });
});


fs.writeFile('temp.html', result, function (err) {
  if (err) throw err;
  console.log('Replaced!');
});
