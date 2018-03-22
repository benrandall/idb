from main import db, Item, Skill, Reddit, Video
import json
import os
MOCK_DB = None

def setup_database():
    with open('fixtures/mock.json', 'r') as mock:
        MOCK_DB = json.load(mock)

    # Reset DB
    db.reflect()
    db.drop_all()
    db.create_all()

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

    db.session.commit()
    for index in range(len(local_items)):
        item = local_items[index]
        item.skills.append(local_skills[index])
        item.videos.append(local_videos[index])
        item.reddits.append(local_reddits[index])

    for index in range(len(local_skills)):
        skill = local_skills[index]
        skill.items.append(local_items[index])
        skill.videos.append(local_videos[index])
        skill.reddits.append(local_reddits[index])

    for index in range(len(local_videos)):
        video = local_videos[index]
        video.items.append(local_items[index])
        video.skills.append(local_skills[index])

    for index in range(len(local_reddits)):
        reddit = local_reddits[index]
        reddit.items.append(local_items[index])
        reddit.skills.append(local_skills[index])

    db.session.commit()

if __name__ == '__main__':
    print("Setting up database")
    setup_database()
    print("Done")
