"""
This module updates the JSON file containing the list of blog entries contained in the
"posts" folder. The idea is to run this file every time a new blog post is saved to
the posts folder. Call from command line within the directory: /blog
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

    s = str(soup.find('p', {'class': 'entry-title'}))
    s = s.split('entry-title">')[1]
    title = s[:s.find('<')]

    s = str(soup.find('p', {'class': 'entry-date'}))
    s = s.split('entry-date">')[1]
    date = s[:s.find('<')]

    entry['name'] = name
    entry['title'] = title
    entry['date'] = date
    entry['tags'] = topics
    entry['hasThumbnail'] = False
    entries_info.append(entry)

with open('blog-entries.json', 'w') as fout:
    json.dump(entries_info, fout, indent=2)
