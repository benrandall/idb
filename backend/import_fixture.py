#test
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import json
import os
MOCK_DB = None

app = Flask(__name__)

user = os.environ['POSTGRES_USER']
pwd = os.environ['POSTGRES_PASSWORD']
db = os.environ['POSTGRES_DB']
host = 'dbpostgres'
port = '5432'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%s:%s@%s:%s/%s' % (user, pwd, host, port, db)

db = SQLAlchemy(app)

class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True, nullable=False)
    examine_info = db.Column(db.Text, nullable=False)
    icon = db.Column(db.Text, nullable=False)
    item_type = db.Column(db.Text, nullable=False)
    market_price = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)

    videos = db.relationship('Video',
                secondary='items_videos',
                backref=db.backref('items_videos', lazy='dynamic'),
                lazy='dynamic')

    reddits = db.relationship('Reddit',
                secondary='items_reddits',
                backref=db.backref('items_reddits', lazy='dynamic'),
                lazy='dynamic')

    skills = db.relationship('Skill',
                secondary='items_skills',
                backref=db.backref('items_skills', lazy='dynamic'),
                lazy='dynamic')

    def __init__(self, item):
        self.name = item['name']
        self.examine_info = item['examine_info']
        self.icon = item['icon']
        self.item_type = item['type']
        self.market_price = item['market_price']
        self.weight = item['weight']

    def __repr__(self):
        return '<Item %r>' % self.name

    def toJSON(self, get_children=True):
        result = {}
        result['id'] = self.id
        result['name'] = self.name
        result['examine_info'] = self.examine_info
        result['icon'] = self.icon
        result['item_type'] = self.item_type
        result['market_price'] = self.market_price
        result['weight'] = self.weight
        if get_children:
            result['skills'] = [skill.toJSON(get_children=False) for skill in self.skills]
            result['reddits'] = [reddit.toJSON(get_children=False) for reddit in self.reddits]
            result['videos'] = [video.toJSON(get_children=False) for video in self.videos]
        return result

class Reddit(db.Model):
    __tablename__ = 'reddits'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Text, unique=True, nullable=False)
    title = db.Column(db.Text, nullable=False)

    skills = db.relationship('Skill',
                secondary='skills_reddits',
                backref=db.backref('reddits_skills', lazy='dynamic'),
                lazy='dynamic')

    items = db.relationship('Item',
                secondary='items_reddits',
                backref=db.backref('reddits_items', lazy='dynamic'),
                lazy='dynamic')

    def __init__(self, reddit):
        self.url = reddit['url']
        self.title = reddit['title']

    def __repr__(self):
        return '<Reddits %r>' % self.title

    def toJSON(self, get_children=True):
        result = {}
        result['id'] = self.id
        result['url'] = self.url
        result['title'] = self.title
        if get_children:
            result['skills'] = [skill.toJSON(get_children=False) for skill in self.skills]
            result['items'] = [item.toJSON(get_children=False) for item in self.items]
        return result

class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    icon = db.Column(db.Text, nullable=False)
    video_url = db.Column(db.Text, unique=True, nullable=False)
    category = db.Column(db.Text, nullable=False)

    skills = db.relationship('Skill',
                secondary='skills_videos',
                backref=db.backref('videos_skills', lazy='dynamic'),
                lazy='dynamic')

    items = db.relationship('Item',
                secondary='items_videos',
                backref=db.backref('videos_items', lazy='dynamic'),
                lazy='dynamic')

    def __init__(self, video):
        self.name = video['name']
        self.icon = video['icon']
        self.category = video['category']
        self.video_url = video['video_url']

    def __repr__(self):
        return '<Video %r>' % self.name

    def toJSON(self, get_children=True):
        result = {}
        result['id'] = self.id
        result['name'] = self.name
        result['icon'] = self.icon
        result['video_url'] = self.video_url
        result['category'] = self.category
        if get_children:
            result['skills'] = [skill.toJSON(get_children=False) for skill in self.skills]
            result['items'] = [item.toJSON(get_children=False) for item in self.items]
        return result

class Skill(db.Model):
    __tablename__ = 'skills'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True, nullable=False)
    icon = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    members_only = db.Column(db.Boolean, nullable=False)
    max_level = db.Column(db.Integer, nullable=False)

    videos = db.relationship('Video',
                secondary='skills_videos',
                backref=db.backref('skills_videos', lazy='dynamic'),
                lazy='dynamic')

    reddits = db.relationship('Reddit',
                secondary='skills_reddits',
                backref=db.backref('skills_reddits', lazy='dynamic'),
                lazy='dynamic')

    items = db.relationship('Item',
                secondary='items_skills',
                backref=db.backref('items_skills', lazy='dynamic'),
                lazy='dynamic')

    def __init__(self, skill):
        self.name = skill['name']
        self.icon = skill['icon']
        self.description = skill['description']
        self.members_only = skill['members_only']
        self.max_level = skill['max_level']

    def __repr__(self):
        return '<Skill %r>' % self.name

    def toJSON(self, get_children=True):
        result = {}
        result['id'] = self.id
        result['name'] = self.name
        result['icon'] = self.icon
        result['description'] = self.description
        result['members_only'] = self.members_only
        result['max_level'] = self.max_level
        if get_children:
            result['reddits'] = [reddit.toJSON(get_children=False) for reddit in self.reddits]
            result['items'] = [item.toJSON(get_children=False) for item in self.items]
            result['videos'] = [video.toJSON(get_children=False) for video in self.videos]
        return result

# Association Tables
items_skills = db.Table('items_skills',
        db.Column('item_id', db.Integer, db.ForeignKey('items.id')),
        db.Column('skill_id', db.Integer, db.ForeignKey('skills.id')),
    )

items_videos = db.Table('items_videos',
        db.Column('item_id', db.Integer, db.ForeignKey('items.id')),
        db.Column('video_id', db.Integer, db.ForeignKey('videos.id')),
    )

items_reddits = db.Table('items_reddits',
        db.Column('item_id', db.Integer, db.ForeignKey('items.id')),
        db.Column('reddit_id', db.Integer, db.ForeignKey('reddits.id')),
    )

skills_videos = db.Table('skills_videos',
        db.Column('skill_id', db.Integer, db.ForeignKey('skills.id')),
        db.Column('videos', db.Integer, db.ForeignKey('videos.id')),
    )

skills_reddits = db.Table('skills_reddits',
        db.Column('skill_id', db.Integer, db.ForeignKey('skills.id')),
        db.Column('reddit_id', db.Integer, db.ForeignKey('reddits.id')),
)

with open('fixtures/mock.json', 'r') as mock:
    MOCK_DB = json.load(mock)

# Reset DB
print('Resetting db...')
db.reflect()
db.drop_all()
db.create_all()

print('Adding items...')
local_items = []
for item in MOCK_DB['items']:
    item_row = Item(item)
    db.session.add(item_row)
    local_items += [item_row]

local_skills = []
for skill in MOCK_DB['skills']:
    skill_row = Skill(skill)
    db.session.add(skill_row)
    local_skills += [skill_row]

local_videos = []
for video in MOCK_DB['videos']:
    video_row = Video(video)
    db.session.add(video_row)
    local_videos += [video_row]

local_reddits = []
for reddit in MOCK_DB['reddits']:
    reddit_row = Reddit(reddit)
    db.session.add(reddit_row)
    local_reddits += [reddit_row]

db.session.commit()
print('Adding relationships...')
for index in range(len(local_items)):
    item = local_items[index]
    item.skills.append(local_skills[index])
    item.videos.append(local_videos[index])
    item.reddits.append(local_reddits[index])

for index in range(len(local_skills)):
    skill = local_skills[index]
    skill.items.append(local_items[index])
    skill.videos.append(local_videos[index])
    skill.reddits.append(local_reddits[index])

for index in range(len(local_videos)):
    video = local_videos[index]
    video.items.append(local_items[index])
    video.skills.append(local_skills[index])

for index in range(len(local_reddits)):
    reddit = local_reddits[index]
    reddit.items.append(local_items[index])
    reddit.skills.append(local_skills[index])

db.session.commit()
print('Done.')

