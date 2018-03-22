from flask import Flask, jsonify, send_from_directory, render_template, Blueprint
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from github import GithubApiWrapper
import json
import requests
import os

db = SQLAlchemy()
app = Blueprint('app', __name__)

def create_app(database_uri, debug=False):
    idb = Flask(__name__)
    idb.config['DEBUG'] = debug
    idb.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    idb.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
    idb.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    idb.register_blueprint(app)
    CORS(idb)
    db.init_app(idb)

    # App error handling
    # Not a fan of doing it in here - but necessary due to blueprints
    @idb.errorhandler(404)
    def page_not_found(e):
        return jsonify(error=404, text=str(e)), 404

    @idb.errorhandler(500)
    def internal_server_error(e):
        return jsonify(error=500, text=str(e)), 500

    return idb


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


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def home():
    react_route = 'runescrape'
    filename = [file for file in os.listdir("react") if file.startswith(react_route) and file.endswith(".js")][0]
    css_filename = [file for file in os.listdir("react") if file.startswith(react_route) and file.endswith(".css")][0]
    return render_template("index.html", filename=filename, css_filename=css_filename)

@app.route("/react/<filename>")
def route_react(filename):
    return send_from_directory("react", filename)

# TODO: refactor
@app.route("/api/images/<path:image_name>")
def image(image_name):
    return send_from_directory("static/img", image_name)

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
    gh = GithubApiWrapper(owner='benrandall', repo='idb', token=os.environ['GITHUB_API_TOKEN'])
    repo_info = gh.repo_info()
    with open('fixtures/about.json', 'r') as about:
        about_json = json.load(about)
    merged_data = [ {**about_json[teammate], **repo_info['teammates'][teammate] } for teammate in repo_info['teammates'].keys() ]
    result = {
            "teammates": merged_data,
            "total_commits": repo_info['total_commits'],
            "total_issues": repo_info['total_issues'],
        }
    return jsonify(result)
