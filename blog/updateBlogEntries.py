"""
This script updates the JSON file containing the list of blog entries contained in the
"posts" folder. The idea is to run this file every time a new blog post is saved to
the posts folder. Call from command line within the directory: /blog. Thanks to
atom-python-run, it can also be run by pressing F5.
"""
import os
import json
from bs4 import BeautifulSoup

path = 'C:\\Users\\tinta\\OneDrive\\Documents\\Web_development\\Robaina.github.io\\blog\\posts'

files = []
# r=root, d=directories, f = files
for r, d, f in os.walk(path):
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
    title = title_str[:title_str.find('<')]

    date_div = soup.find('p', {'id': 'entry-date'})
    date_str = str(date_div)
    date_str = date_str.split('entry-date">')[1]
    date = date_str[:date_str.find('<')]

    entry['name'] = name
    entry['title'] = title
    entry['date'] = date
    entry['tags'] = topics
    entry['hasThumbnail'] = False
    entries_info.append(entry)

with open('blog-entries.json', 'w') as fout:
    json.dump(entries_info, fout, indent=2)


"""
Replace empty date with current date:

from datetime import date
today = date.today()
current_date = today.strftime('%d %B, %Y')

if date_div.string == '':
    date_div.string = current_date

with open("example_modified.html", "wb") as f_output:
    f_output.write(soup.prettify("utf-8"))
"""
