from flask import current_app
from app import db
from app.search import add_to_index, remove_from_index, query_index

class SearchableMixin(object):
    @classmethod
    def search(cls, expression, page, per_page):
        print('query index args: %s %s %s %s' % (cls.__tablename__, expression, page, per_page))
        ids, total = query_index(cls.__tablename__, expression, page, per_page)
        if total == 0:
            return cls.query.filter_by(id=0), 0
        when = []
        for i in range(len(ids)):
            when.append((ids[i], i))
        return cls.query.filter(cls.id.in_(ids)).order_by(
            db.case(when, value=cls.id)), total

    @classmethod
    def before_commit(cls, session):
        session._changes = {
                'add': [obj for obj in session.new if isinstance(obj, cls)],
                'update': [obj for obj in session.dirty if isinstance(obj, cls)],
                'delete': [obj for obj in session.deleted if isinstance(obj, cls)],
              }

    @classmethod
    def after_commit(cls, session):
        for obj in session._changes.get('add', []):
            add_to_index(cls.__tablename__, obj)
        for obj in session._changes.get('update', []):
            add_to_index(cls.__tablename__, obj)
        for obj in session._changes.get('delete', []):
            remove_from_index(cls.__tablename__, obj)

    @classmethod
    def reindex(cls):
        for obj in cls.query:
            add_to_index(cls.__tablename__, obj)

class Item(SearchableMixin, db.Model):
    __tablename__ = 'items'
    __searchable__ = ['name', 'examine_info', 'icon', 'item_type']

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

class Reddit(SearchableMixin, db.Model):
    __tablename__ = 'reddits'
    __searchable__ = ['url', 'title']

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

class Video(SearchableMixin, db.Model):
    __tablename__ = 'videos'
    __searchable__ = ['name', 'category', 'video_url']

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

class Skill(SearchableMixin, db.Model):
    __tablename__ = 'skills'
    __searchable__ = ['name', 'description']

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

db.event.listen(db.session, 'before_commit', Item.before_commit)
db.event.listen(db.session, 'after_commit', Item.after_commit)

db.event.listen(db.session, 'before_commit', Skill.before_commit)
db.event.listen(db.session, 'after_commit', Skill.after_commit)

db.event.listen(db.session, 'before_commit', Reddit.before_commit)
db.event.listen(db.session, 'after_commit', Reddit.after_commit)

db.event.listen(db.session, 'before_commit', Video.before_commit)
db.event.listen(db.session, 'after_commit', Video.after_commit)


