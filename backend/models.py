from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
        'postgresql://localhost/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

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

    def __repr__(self):
        return '<Item %r>' % self.name

class RedditPost(db.Model):
    __tablename__ = 'reddit_posts'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Text, unique=True, nullable=False)
    title = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return '<RedditPost %r>' % self.title


class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    icon = db.Column(db.Text, nullable=False)
    video_url = db.Column(db.Text, unique=True, nullable=False)
    category = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return '<Video %r>' % self.name

class Skill(db.Model):
    __tablename__ = 'skills'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True, nullable=False)
    icon = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    members_only = db.Column(db.Boolean, nullable=False)
    max_level = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Skill %r>' % self.name

if __name__ == "__main__":
    app.run()
