from subprocess import call
from bs4 import BeautifulSoup
import os
import json
import time

work_dir = 'C:\\Users\\tinta\\OneDrive\\Documents\\Web_development\\Robaina.github.io\\blog'


def createHTMLPostFromMD(markdown_file_name):

    # Call node.js script (convert md to html)
    # call(['node', f'convertMdToHtml.js md-posts\\{markdown_file_name}.md'])
    call(['node', 'convertMdToHtml.js'])

    template = BeautifulSoup(open('post-template.html'), "html.parser")
    content = BeautifulSoup(open('temp.html'), "html.parser")

    # Retrieve blog entry metadata
    preamble = content.find('preamble')
    title = preamble.find('h1', {'id': 'title'}).string
    date = preamble.find('h3', {'id': 'date'}).string
    tags = preamble.find('h4', {'id': 'tags'}).string.split(',')
    # has_images = preamble.find('h4', {'id': 'has-images'}).string
    # has_thumbnail = preamble.find('h4', {'id': 'has-thumbnail-image'}).string
    keywords = preamble.find('h4', {'id': 'keywords'}).string
    description = preamble.find('h4', {'id': 'description'}).string

    # Insert post metadata
    entry_title = template.find('p', {'id': 'entry-title'})
    entry_title.string = title
    entry_date = template.find('p', {'id': 'entry-date'})
    entry_date.string = date
    tag_container = template.find('div', {'id': 'tag-container'})
    for tag in tags:
        tag = tag.strip().capitalize()
        tag_container.append('<div class="topictag {}"></div>'.format(tag))
    entry_keywords = template.find('meta', {'name': 'keywords'})
    entry_keywords.attrs['content'] = keywords
    entry_description = template.find('meta', {'name': 'description'})
    entry_description.attrs['content'] = description

    # Insert post content
    blog_content = str(content).split('</preamble>')[1]
    article = template.find('article', {'id': 'blog-content'})
    article.string = blog_content

    # Write final html
    html_name = markdown_file_name.lower()
    # formatter=None does not replace < tags by html code.
    # but adds extra space and line break between divs. Hence the removal.
    html_str = template.prettify(
        formatter=None).replace(
            '<div class="commentbox">\n    </div>', '<div class="commentbox"></div>')

    with open(f'posts/{html_name}.html', mode='w') as f_out:
        f_out.write(html_str)
    f_out.close()

    # Create blog images directory
    post_has_images = '<img' in str(content)
    if post_has_images:
        directory = f'\\imgs\\blog\\{html_name}'
        if not os.path.exists(directory):
            os.makedirs(directory)


# Find all md files
md_files = []
# r=root, d=directories, f = files
for r, d, f in os.walk(work_dir + '\\md-posts'):
    for file in f:
        if '.md' in file:
            # md_files.append(os.path.join(r, file))
            md_files.append(file.split('.md')[0])

# Find all html files
html_files = []
# r=root, d=directories, f = files
for r, d, f in os.walk(work_dir + '\\posts'):
    for file in f:
        if '.html' in file:
            # html_files.append(os.path.join(r, file))
            html_files.append(file.split('.html')[0])


# Find md files yet to be converted to html
def post_is_unfinished(fileName):
    """Find posts that are not yet ready"""
    with open(work_dir + '\\md-posts\\' + fileName + '.md', 'r') as f:
        line_list = f.readlines()
        ready_line = [line for line in line_list if 'post-ready' in line]
        if len(ready_line) > 0:
            return 'yes' not in ready_line[0].lower()
        else:
            return False
    f.close()


md_to_convert = [md for md in md_files
                 if (md.lower() not in html_files
                     or post_is_unfinished(md))]


# Convert to html and update blog-entries.json
for md_file in md_to_convert:
    # Make temporal copy for node.js
    os.popen(f'copy md-posts\\{md_file}.md temp.md')
    createHTMLPostFromMD(md_file)
    os.remove('temp.html')
    os.remove('temp.md')


# Upate JSON with entry data
"""
This script updates the JSON file containing the list of blog entries contained in the
"posts" folder. The idea is to run this file every time a new blog post is saved to
the posts folder. Call from command line within the directory: /blog. Thanks to
atom-python-run, it can also be run by pressing F5.
"""
files = []
# r=root, d=directories, f = files
for r, d, f in os.walk(work_dir + '\\posts'):
    for file in f:
        if '.html' in file:
            files.append(os.path.join(r, file))

entries_info = []
for f in files:
    soup = BeautifulSoup(open(f), "html.parser")

    # parse topic tags
    topics = []
    entry = {}
    name = str(f).split('\\')[-1].split('.html')[0]

    for tag in soup.find_all('div', {'class': 'topictag'}):
        s = str(tag).split('topictag ')[1]
        topic = s[:s.find('">')]
        topics.append(topic)

    title_str = str(soup.find('p', {'id': 'entry-title'}))
    title_str = title_str.split('entry-title">')[1]
    title = title_str[:title_str.find('<')].replace('\\n', '').strip()

    date_div = soup.find('p', {'id': 'entry-date'})
    date_str = str(date_div)
    date_str = date_str.split('entry-date">')[1]
    date = date_str[:date_str.find('<')].replace('\\n', '').strip()

    entry['name'] = name
    entry['title'] = title
    entry['date'] = date
    entry['tags'] = topics
    entry['hasThumbnail'] = False
    entries_info.append(entry)

# Sort by date!
entries_info.sort(key=lambda entry: time.strptime(entry['date'], '%d %B, %Y'), reverse=True)

with open('blog-entries.json', 'w') as fout:
    json.dump(entries_info, fout, indent=2)
