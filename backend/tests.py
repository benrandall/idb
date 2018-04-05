import unittest
import os
from app import create_app, db
from app.api.github import GithubApiWrapper
from app.models import Item, Reddit, Skill, Video
from config import Config

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    ELASTICSEARCH_URL = None

class IdbTests(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.app.testing = True
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_github(self):
        gh = GithubApiWrapper(owner='benrandall', repo='idb', token=os.environ.get('GITHUB_API_TOKEN'))
        report = gh.repo_info()
        assert len(report['teammates']) == 6
        assert report['total_issues'] > 10
        assert report['total_commits'] > 10

    def test_skill_model(self):
        skill = Skill({'name': "name",
                      'icon': "fakeicon.png",
                      'description': "fake desc",
                      'members_only': False,
                      'max_level': 99})
        db.session.add(skill)
        db.session.commit()
        skills = Skill.query.all()
        assert skill in skills
        assert str(skill) == "<Skill 'name'>"
        assert skill.toJSON(False) == {'id': 1,
                                       'name': 'name',
                                       'icon': 'fakeicon.png',
                                       'description': 'fake desc',
                                       'members_only': False,
                                       'max_level': 99}
        assert len(skills) == 1

    def test_item_model(self):
        item = Item({'name': "name",
                     'icon': "fakeicon.png",
                     'examine_info': "fake info",
                     'type': "fake type",
                     'market_price': 99,
                     'weight': 0})
        db.session.add(item)
        db.session.commit()
        items = Item.query.all()
        assert item in items
        assert str(item) == "<Item 'name'>"
        assert item.toJSON(False) == {'id': 1,
                                      'name': 'name',
                                      'icon': "fakeicon.png",
                                      'examine_info': "fake info",
                                      'item_type': "fake type",
                                      'market_price': 99,
                                      'weight': 0}
        assert len(items) == 1

    def test_reddit_model(self):
        reddit = Reddit({'url': "http://localhost:5000",
                         'title': 'Reddit title'})

        db.session.add(reddit)
        db.session.commit()
        reddits = Reddit.query.all()
        assert reddit in reddits
        assert str(reddit) == "<Reddits 'Reddit title'>"
        assert reddit.toJSON(False) == {'id': 1,
                                        'url': 'http://localhost:5000',
                                        'title': 'Reddit title'}
        assert len(reddits) == 1

    def test_video_model(self):
        video = Video({'name': "Video Name",
                       'icon': 'fakeicon.png',
                       'video_url': "http://youtube.com/",
                       'category': 'runescape'})

        db.session.add(video)
        db.session.commit()
        videos = Video.query.all()
        assert video in videos
        assert str(video) == "<Video 'Video Name'>"
        assert video.toJSON(False) == {'id': 1,
                                       'name': "Video Name",
                                       'icon': 'fakeicon.png',
                                       'video_url': "http://youtube.com/",
                                       'category': 'runescape'}
        assert len(videos) == 1

    def test_404_response(self):
        resp = self.client.get('/badreq')
        assert resp.headers['content-type'] == 'application/json'
        assert resp.status_code == 404

    def test_images(self):
        resp = self.client.get('/images/luke.jpg')
        assert resp.headers['content-type'] == 'image/jpeg'
        assert resp.status_code == 200

if __name__ == '__main__':
    unittest.main()
