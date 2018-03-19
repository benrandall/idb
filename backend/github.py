import requests

COMMITS_ENDPOINT = 'https://api.github.com/repos/%s/%s/contributors?access_token=%s'
ISSUES_ENDPOINT ='https://api.github.com/repos/%s/%s/issues?state=all&access_token=%s'
PAGED_ISSUES_ENDPOINT = 'https://api.github.com/repos/benrandall/idb/issues?state=all&page=%d&access_token=%s'

class GithubApiWrapper():

    def __init__(self, owner=None, repo=None, token=None):
        self.commits_endpoint = COMMITS_ENDPOINT % (owner, repo, token)
        self.issues_endpoint = ISSUES_ENDPOINT % (owner, repo, token)
        self.total_commits = 0
        self.total_issues = 0
        self.token = token
        self.teammates = {}

    def _strip_page_count(self, issues_response):
        return int(issues_response.headers['Link'].split(',')[1].split(';')[0][-2])

    def _issues(self):
        issues_response = requests.get(self.issues_endpoint)
        total_issues = len(issues_response.json())
        last_page = self._strip_page_count(issues_response)
        for page in range(1, last_page + 1):
            paged_response = requests.get(PAGED_ISSUES_ENDPOINT % (page, self.token))
            for issue in paged_response.json():
                teammate = issue['user']['login']
                if teammate in self.teammates:
                    self.teammates[teammate]['issues'] += 1
                self.total_issues += 1


    def _commits(self):
        commits_response = requests.get(self.commits_endpoint)
        for contributor in commits_response.json():
            self.total_commits += contributor['contributions']
            self.teammates[contributor['login']] = {
                    'commits': contributor['contributions'],
                    'issues': 0
                    }

    def repo_info(self):
        try:
            self._commits()
            self._issues()
            report = {
                    'teammates': self.teammates,
                    'total_issues': self.total_issues,
                    'total_commits': self.total_commits
                    }
            return report
        except Exception:
            app.logger('Error processing Github request')
