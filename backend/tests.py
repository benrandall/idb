import unittest
import json
from app import create_app, db
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
