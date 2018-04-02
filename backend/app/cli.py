import click
import json
from app import db
from app.models import Item, Skill, Reddit, Video

def register(app):
    @app.cli.command()
    def db_import():
        """Initialize the database."""
        click.echo('Database initialization')
        MOCK_DB = None
        with open('fixtures/mock.json', 'r') as mock:
            MOCK_DB = json.load(mock)

        click.echo('Resetting db...')
        db.reflect()
        db.drop_all()
        db.create_all()

        click.echo('Adding items...')
        local_items = []
        for item in MOCK_DB['items']:
            item_row = Item(item)
            db.session.add(item_row)
            local_items += [item_row]

        local_skills = []
        for skill in MOCK_DB['skills']:
            skill_row = Skill(skill)
            db.session.add(skill_row)
            local_skills += [skill_row]

        local_videos = []
        for video in MOCK_DB['videos']:
            video_row = Video(video)
            db.session.add(video_row)
            local_videos += [video_row]

        local_reddits = []
        for reddit in MOCK_DB['reddits']:
            reddit_row = Reddit(reddit)
            db.session.add(reddit_row)
            local_reddits += [reddit_row]

        for json_item in MOCK_DB['items']:
            db_item = local_items[json_item['id'] - 1]
            for skill_id in json_item['skills']:
                db_item.skills.append(local_skills[skill_id - 1])
            for reddit_id in json_item['reddits']:
                db_item.reddits.append(local_reddits[reddit_id - 1])
            for video_id in json_item['videos']:
                db_item.videos.append(local_videos[video_id - 1])
            db.session.add(db_item)

        for json_skill in MOCK_DB['skills']:
            db_skill = local_skills[json_skill['id'] - 1]
            for item_id in json_skill['items']:
                db_skill.items.append(local_items[item_id - 1])
            for reddit_id in json_skill['reddits']:
                db_skill.reddits.append(local_reddits[reddit_id - 1])
            for video_id in json_skill['videos']:
                db_skill.videos.append(local_videos[video_id - 1])
            db.session.add(db_skill)

        for json_video in MOCK_DB['videos']:
            db_video = local_videos[json_video['id'] - 1]
            for item_id in json_video['items']:
                db_video.items.append(local_items[item_id - 1])
            for skill_id in json_video['skills']:
                db_video.skills.append(local_skills[skill_id - 1])
            db.session.add(db_video)

        for json_reddit in MOCK_DB['reddits']:
            db_reddit = local_reddits[json_reddit['id'] - 1]
            for item_id in json_reddit['items']:
                db_reddit.items.append(local_items[item_id - 1])
            for skill_id in json_reddit['skills']:
                db_reddit.skills.append(local_skills[skill_id - 1])
            db.session.add(db_reddit)
        click.echo('Reindexing for elasticsearch...')
        db.session.commit()
        Item.reindex()
        Skill.reindex()
        Reddit.reindex()
        Video.reindex()
        click.echo('Done.')


