import json
import os
from flask import request, jsonify, current_app, send_from_directory
from app import db, cached
from app.models import Item, Skill, Video, Reddit
from app.api import bp
from app.api.github import GithubApiWrapper

@bp.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@bp.route("/images/<path:image_name>")
def image(image_name):
    return send_from_directory("static/img", image_name)

@bp.route("/json/<path:json_name>")
def json(json_name):
    return send_from_directory("static/json", json_name)

@bp.route("/js/<path:js_name>")
def js(js_name):
    return send_from_directory("static/js", js_name)

@bp.route('/search')
def search():
    page = request.args.get('page', 1, type=int)
    query = request.args.get('q')
    items_query, total = Item.search(query, page, current_app.config['POSTS_PER_PAGE'])
    items = [item for item in items_query]
    videos_query, total = Video.search(query, page, current_app.config['POSTS_PER_PAGE'])
    videos = [video for video in videos_query]
    skills_query, total = Skill.search(query, page, current_app.config['POSTS_PER_PAGE'])
    skills = [skill for skill in skills_query]
    reddits_query, total = Reddit.search(query, page, current_app.config['POSTS_PER_PAGE'])
    reddits = [reddit for reddit in reddits_query]
    all_items = items + videos + skills + reddits
    result = {
            'result': [i.toJSON() for i in all_items],
            'has_more': total > page * current_app.config['POSTS_PER_PAGE'],
        }
    return jsonify(result)

@bp.route('/about')
@cached()
def about():
    gh = GithubApiWrapper(owner='benrandall', repo='idb', token=current_app.config['GITHUB_API_TOKEN'])
    repo_info = gh.repo_info()
    with open('fixtures/about.json', 'r') as about:
        about_json = json.load(about)
    merged_data = [ {**about_json[teammate], **repo_info['teammates'][teammate] } for teammate in repo_info['teammates'].keys() ]
    result = {
            "teammates": merged_data,
            "total_commits": repo_info['total_commits'],
            "total_issues": repo_info['total_issues'],
            "total_unittests": sum([about_json[teammate]['unittests'] for teammate in about_json])
        }
    return jsonify(result)

@bp.route('/community')
def community():
    return jsonify({
        'reddits': [reddit.toJSON() for reddit in Reddit.query.all()],
        'videos': [video.toJSON() for video in Video.query.all()]
    })
