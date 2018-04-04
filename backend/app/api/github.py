import requests
import json
from flask import current_app

COMMITS_ENDPOINT = 'https://api.github.com/repos/%s/%s/contributors?access_token=%s'
ISSUES_ENDPOINT ='https://api.github.com/repos/%s/%s/issues?state=all&access_token=%s&'
PAGE_ARG = 'page=%d&'


class GithubApiWrapper():

    def __init__(self, owner=None, repo=None, token=None):
        self.commits_endpoint = COMMITS_ENDPOINT % (owner, repo, token)
        self.issues_endpoint = ISSUES_ENDPOINT % (owner, repo, token)
        self.issues_request_data = []
        self.total_commits = 0
        self.total_issues = 0
        self.token = token
        self.teammates = {}

    def _strip_page_count(self, issues_response_headers):
        return int(issues_response_headers['Link'].split(',')[1].split(';')[0][-2])

    def _send_commits_request(self):
        return requests.get(self.commits_endpoint).json()

    def _send_issues_request(self):
        issues_response = requests.get(self.issues_endpoint)
        last_page = self._strip_page_count(issues_response.headers)
        list_of_paged_requests = [requests.get(self.issues_endpoint + PAGE_ARG % page).json()
                                    for page in range(1, last_page + 1)]
        return [request for sublist in list_of_paged_requests for request in sublist]

    def _issues(self, issues_responses):
        for issue in issues_responses:
            teammate = issue['user']['login']
            if teammate in self.teammates:
                self.teammates[teammate]['issues'] += 1
            self.total_issues += 1

    def _commits(self, commits_responses):
        for contributor in commits_responses:
            self.total_commits += contributor['contributions']
            self.teammates[contributor['login']] = {
                    'commits': contributor['contributions'],
                    'issues': 0
                    }

    def repo_info(self):
        try:
            self._commits(self._send_commits_request())
            self._issues(self._send_issues_request())
            report = {
                    'teammates': self.teammates,
                    'total_issues': self.total_issues,
                    'total_commits': self.total_commits
                    }
            return report
        except Exception:
            current_app.logger('Error processing Github request')
