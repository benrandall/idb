from flask import Flask, jsonify
from flask_bootstrap import Bootstrap
import json
import requests
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
        'postgresql://username:password@localhost/database'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

MOCK_DB = None

with open('fixtures/mock.json', 'r') as mock:
    MOCK_DB = json.load(mock)

# API
@app.route('/api/items/all')
def all_items():
    response = jsonify(MOCK_DB['items'])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/api/skills/all')
def all_skills():
    response = jsonify(MOCK_DB['skills'])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/items/<int:item_id>/videos')
def all_videos_for_item(item_id):
    found = None
    for item in MOCK_DB['items']:
        if item['id'] == item_id:
            found = item
            break

    videos = []
    for video_id in found['videos']:
        vid = video_from_id(video_id)
        if vid is not None:
            videos += (vid,)

    return jsonify(videos)

@app.route('/api/skills/<int:item_id>/videos')
def all_videos_for_skills(item_id):
    found = None
    for item in MOCK_DB['skills']:
        if item['id'] == item_id:
            found = item
            break

    videos = []
    for video_id in found['videos']:
        vid = video_from_id(video_id)
        if vid is not None:
            videos += (vid,)

    return jsonify(videos)

@app.route('/api/videos/all')
def all_videos():
    return jsonify(MOCK_DB['videos'])


@app.route('/about/')
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
    return render_template('about.html', issue_data=issue_data, total_issues=total_issues, total_commits=total_commits,
                           commit_data=commit_data)


def video_from_id(id: int):
    """
    Helper function to get a video from a given ID
    :param id: ID of the video
    :return: Video or None
    """
    for video in MOCK_DB['videos']:
        if video['id'] == id:
            return video

    return None

if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.config["DEBUG"] = True
    app.config["TEMPLATES_AUTO_RELOAD"] = True
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.run()
