from flask import Flask, render_template, jsonify
from flask_bootstrap import Bootstrap
import json
import requests
import os

app = Flask(__name__)
bootstrap = Bootstrap(app)

MOCK_DB = None

with open('fixtures/mock.json', 'r') as mock:
    MOCK_DB = json.load(mock)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/api/items/all')
def all_items():
    return jsonify(MOCK_DB['items'])

@app.route('/api/skills/all')
def all_skills():
    return jsonify(MOCK_DB['skills'])
@app.route('/api/videos/all')
def all_videos():
    return jsonify(MOCK_DB['videos'])

@app.route('/items/')
def items():
    return render_template('items.html', items=json.dumps(MOCK_DB['items']))

@app.route('/items/<int:item_id>')
def get_item(item_id):
    for item in MOCK_DB['items']:
        if item['id'] == item_id:
            return render_template('item.html', item=item)
    return render_template('404.html')

@app.route('/skills/')
def skills():
    return render_template('skills.html', skills=json.dumps(MOCK_DB['skills']))

@app.route('/skills/<int:skill_id>')
def get_skill(skill_id):
    for skill in MOCK_DB['skills']:
        if skill['id'] == skill_id:
            return render_template('skill.html', skill=skill)
    return render_template('404.html')

@app.route('/videos/')
def videos():
    return render_template('videos.html', videos=json.dumps(MOCK_DB['videos']))

@app.route('/videos/<int:video_id>')
def get_video(video_id):
    for video in MOCK_DB['videos']:
        if video['id'] == video_id:
            return render_template('video.html', video=video)
    return render_template('404.html')

@app.route('/about/')
def about():
    commits_endpoint='https://api.github.com/repos/benrandall/idb/contributors?access_token=%s' % os.environ['GITHUB_API_TOKEN']
    issues_endpoint='https://api.github.com/repos/benrandall/idb/issues?access_token=%s' % os.environ['GITHUB_API_TOKEN']
    commits_response = requests.get(commits_endpoint)
    issues_response = requests.get(issues_endpoint)
    commit_data = []
    total_commits = 0
    for contributor in commits_response.json():
        app.logger.error('here: %s' % contributor)
        team_member = contributor['login']
        num_commits = contributor['contributions']
        total_commits += num_commits
        commit_data.append((team_member, num_commits))
    issue_data = {}
    total_issues = len(issues_response.json())
    for issue in issues_response.json():
        team_member = issue['user']['login']
        if team_member in issue_data:
            issue_data[team_member] += 1
        else:
            issue_data[team_member] = 1
    return render_template('about.html', issue_data=issue_data, total_issues=total_issues, total_commits=total_commits, commit_data=commit_data)

if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.config["DEBUG"] = True
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.run()

