import os
import unittest
import json
from flask import Flask
from flask_testing import TestCase
from main import create_app, db, Item, Reddit, Video, Skill


class IdbTests(TestCase):
    def create_app(self):
        # in-memory db
        app = create_app('sqlite://', True)
        app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = False
        return app

    def setUp(self):
        # set up data from our fixtures
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
            if (index < len(local_skills)):
                item.skills.append(local_skills[index])
            if (index < len(local_videos)):
                item.videos.append(local_videos[index])
            if (index < len(local_reddits)):
                item.reddits.append(local_reddits[index])

        for index in range(len(local_skills)):
            skill = local_skills[index]
            if (index < len(local_items)):
                skill.items.append(local_items[index])
            if (index < len(local_videos)):
                skill.videos.append(local_videos[index])
            if (index < len(local_reddits)):
                skill.reddits.append(local_reddits[index])

        for index in range(len(local_videos)):
            video = local_videos[index]
            if (index < len(local_items)):
                video.items.append(local_items[index])
            if (index < len(local_skills)):
                video.skills.append(local_skills[index])

        for index in range(len(local_reddits)):
            reddit = local_reddits[index]
            if (index < len(local_items)):
                reddit.items.append(local_items[index])
            if (index < len(local_skills)):
                reddit.skills.append(local_skills[index])

        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    #TODO: fix how react app is being started so we don't have to rely on
    # react files for this test
    # def test_home_response(self):
    #     response = self.client.get('/')
    #     self.assert200(response)

    def test_all_items(self):
        response = self.client.get('/api/items/all')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json[0]['market_price'], 433)

    def test_all_skills(self):
        response = self.client.get('/api/skills/all')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json[0]['max_level'], 99)

    def test_all_videos(self):
        response = self.client.get('/api/videos/all')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json[0]['category'], 'RuneScape')

    def test_all_reddits(self):
        response = self.client.get('/api/reddits/all')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json[0]['title'], 'Loot from cutting 119k semi-precious gems')

    def test_get_item(self):
        response = self.client.get('/api/item/1')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json['name'], 'Jade')

    def test_get_skill(self):
        response = self.client.get('/api/skill/1')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json['name'], 'Crafting')

    def test_get_video(self):
        response = self.client.get('/api/video/1')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json['name'], 'OSRS 99 CRAFTING GUIDE 07 RS')

    def test_get_reddit(self):
        response = self.client.get('/api/reddit/1')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json['title'], 'Loot from cutting 119k semi-precious gems')

    def test_get_community(self):
        response = self.client.get('/api/community/all')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json['reddits'][0]['title'], 'Loot from cutting 119k semi-precious gems')

    def test_get_about(self):
        response = self.client.get('/api/about')
        self.assert200(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(len(response.json['teammates']), 6)

    def test_404(self):
        response = self.client.get('/api/badendpoint')
        self.assert404(response)
        self.assertIn("json", str(response.headers))
        self.assertEqual(response.json['error'], 404)

if __name__ == '__main__':
    unittest.main()
