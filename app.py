from flask import Flask, render_template, jsonify
from flask_bootstrap import Bootstrap
import json

app = Flask(__name__)
bootstrap = Bootstrap(app)

MOCK_DB = None
with open('fixtures/mock.json', 'r') as mock:
    MOCK_DB = json.load(mock)

@app.route('/')
def about():
    return render_template('index.html')

@app.route('/items/')
def items(name):
    return render_template('items.html', name=name)

@app.route('/items/<int:item_id>')
def get_item(item_id):
    for item in MOCK_DB['items']:
        if item['id'] == item_id:
            return render_template('item.html', name=item['name'], examine_info=item['examine_info'])
    return render_template('404.html')


@app.route('/skills')
def skills():
    return jsonify({
        'hello': 'skills',
        })


@app.route('/skills/<int:skill_id>')
def get_skill(skill_id):
    for skill in MOCK_DB['skills']:
        if skill['id'] == skill_id:
            return render_template('skill.html', name=skill['name'])
    return render_template('404.html')

@app.route('/videos')
def videos():
    return jsonify({
        'hello': 'video',
        })

@app.route('/videos/<int:video_id>')
def get_video(video_id):
    for video in MOCK_DB['videos']:
        if video['id'] == video_id:
            return render_template('video.html', video=video)
    return render_template('404.html')

if __name__ == "__main__":
    app.run()

