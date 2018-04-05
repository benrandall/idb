import unittest
import os
import json
from app import create_app, db
from app.api.github import GithubApiWrapper
from app.models import Item, Reddit, Skill, Video
from app.api.github import GithubApiWrapper
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
        issues_file = open('fixtures/github_issues_response_stub.json', 'r')
        commits_file = open('fixtures/github_commits_response_stub.json', 'r')
        self.issues_fixture_json = json.load(issues_file)
        self.commits_fixture_json = json.load(commits_file)
        issues_file.close()
        commits_file.close()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_skill_model(self):
        skill = Skill({'name': "name",
                      'icon': "fakeicon.png",
                      'description': "fake desc",
                      'members_only': False,
                      'max_level': 99,
                      'skill_type': 'test'})
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
                     'weight': 0,
                     'members_only': True,
                     'equipable': True,
                     'quest_item': False})
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
                         'title': 'Reddit title',
                         'category': 'reddit',
                         'community_type': 'subreddit'})

        db.session.add(reddit)
        db.session.commit()
        reddits = Reddit.query.all()
        assert reddit in reddits
        assert str(reddit) == "<Reddits 'Reddit title'>"
        assert reddit.toJSON(False) == {'id': 1,
                                        'url': 'http://localhost:5000',
                                        'title': 'Reddit title',
                                        'category': 'reddit',
                                        'community_type': 'subreddit'}
        assert len(reddits) == 1

    def test_video_model(self):
        video = Video({'name': "Video Name",
                       'icon': 'fakeicon.png',
                       'video_url': "http://youtube.com/",
                       'category': 'runescape',
                       'community_type': 'youtube'})

        db.session.add(video)
        db.session.commit()
        videos = Video.query.all()
        assert video in videos
        assert str(video) == "<Video 'Video Name'>"
        assert video.toJSON(False) == {'id': 1,
                                       'name': "Video Name",
                                       'icon': 'fakeicon.png',
                                       'video_url': "http://youtube.com/",
                                       'category': 'runescape',
                                       'community_type': 'youtube'}
        assert len(videos) == 1

    def test_404_response(self):
        resp = self.client.get('/badreq')
        assert resp.headers['content-type'] == 'application/json'
        assert resp.status_code == 404

    def test_images(self):
        resp = self.client.get('/images/luke.jpg')
        assert resp.headers['content-type'] == 'image/jpeg'
        assert resp.status_code == 200

    def test_github_strip_page_count(self):
        gh = GithubApiWrapper(owner='benrandall', repo='idb', token=self.app.config['GITHUB_API_TOKEN'])
        headers = {'Link': '<https://api.github.com/repositories/120353605/issues?state=all&access_token=redacted&page=2>; rel="next", <https://api.github.com/repositories/120353605/issues?state=all&access_token=redacted&page=6>; rel="last"'}
        self.assertEqual(6, gh._strip_page_count(headers))

    def test_github_issues_parse(self):
        gh = GithubApiWrapper(owner='benrandall', repo='idb', token=self.app.config['GITHUB_API_TOKEN'])
        gh._commits(self.commits_fixture_json)
        gh._issues(self.issues_fixture_json)
        self.assertEqual(gh.total_commits, 168)
        self.assertEqual(gh.total_issues, 165)

    def test_github_commits_parse(self):
        gh = GithubApiWrapper(owner='benrandall', repo='idb', token=self.app.config['GITHUB_API_TOKEN'])
        gh._commits(self.commits_fixture_json)
        self.assertEqual(gh.total_commits, 168)
        self.assertEqual(len(gh.teammates), 6)

    def test_github_error(self):
        gh = GithubApiWrapper(owner='benrandall', repo='idb', token='nope')
        self.assertRaises(Exception, gh.repo_info)

if __name__ == '__main__':
    unittest.main()
