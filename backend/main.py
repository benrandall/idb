from flask import Flask, jsonify, abort
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
#from models import Item, Video, Reddit, Skill
import json
import requests
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
        'postgresql://localhost/postgres'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
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

# API
@app.route('/api/items/all')
def all_items():
    return jsonify([item.toJSON() for item in Item.query.all()])

@app.route('/api/skills/all')
def all_skills():
    return jsonify([skill.toJSON() for skill in Skill.query.all()])

@app.route('/api/videos/all')
def all_videos():
    return jsonify([video.toJSON() for video in Video.query.all()])

@app.route('/api/reddits/all')
def all_reddits():
    return jsonify([reddit.toJSON() for reddit in Reddit.query.all()])

@app.route('/api/item/<int:item_id>')
def get_item(item_id):
    return jsonify(Item.query.get_or_404(item_id).toJSON())

@app.route('/api/skill/<int:skill_id>')
def get_skill(skill_id):
    return jsonify(Skill.query.get_or_404(skill_id).toJSON())

@app.route('/api/video/<int:video_id>')
def get_video(video_id):
    return jsonify(Video.query.get_or_404(video_id).toJSON())

@app.route('/api/reddit/<int:reddit_id>')
def get_reddit(reddit_id):
    return jsonify(Reddit.query.get_or_404(reddit_id).toJSON())

@app.route('/api/community/all')
def all_community():
    return jsonify({
        'reddits': [reddit.toJSON() for reddit in Reddit.query.all()],
        'videos': [video.toJSON() for video in Video.query.all()]
    })

@app.route('/api/about')
def about():
    commits_endpoint='https://api.github.com/repos/benrandall/idb/contributors?access_token=%s' % os.environ['GITHUB_API_TOKEN']
    issues_endpoint='https://api.github.com/repos/benrandall/idb/issues?state=all&access_token=%s' % os.environ['GITHUB_API_TOKEN']

    commits_response = requests.get(commits_endpoint)
    issues_response = requests.get(issues_endpoint)
    commit_data = []
    total_commits = 0
    for contributor in commits_response.json():
        team_member = contributor['login']
        num_commits = contributor['contributions']
        total_commits += num_commits
        commit_data.append((team_member, num_commits))
    issue_data = {}
    total_issues = len(issues_response.json())
    current_page = 1
    for issue in issues_response.json():
        team_member = issue['user']['login']
        if team_member in issue_data:
            issue_data[team_member] += 1
        else:
            issue_data[team_member] = 1
    current_page += 1
    try:
        last_page = int(issues_response.headers['Link'].split(',')[1].split(';')[0][-2])
        for page in range(current_page, last_page + 1):
            paged_issues_endpoint = 'https://api.github.com/repos/benrandall/idb/issues?state=all&page=%d&access_token=%s' % (page, os.environ['GITHUB_API_TOKEN'])
            paged_issue_response = requests.get(paged_issues_endpoint)
            for issue in paged_issue_response.json():
                team_member = issue['user']['login']
                if team_member in issue_data:
                    issue_data[team_member] += 1
                else:
                    issue_data[team_member] = 1
    except Exception:
        app.logger('Error processing paged issues')

    combined = {
        'issues': issue_data,
        'total_issues': total_issues,
        'total_commits': total_commits,
        'commit_data': commit_data
    }

    return jsonify(combined)
    # return render_template('about.html', issue_data=issue_data, total_issues=total_issues, total_commits=total_commits,
    #                        commit_data=commit_data)

# App error handling
@app.errorhandler(404)
def page_not_found(e):
    return jsonify(error=404, text=str(e)), 404

@app.errorhandler(500)
def internal_server_error(e):
    return jsonify(error=500, text=str(e)), 500

if __name__ == "__main__":
    app.config["DEBUG"] = True
    app.run()
