import os
import unittest
from flask import Flask
from flask_testing import TestCase
from main import create_app, db
from import_fixture import setup_database


class IdbTests(TestCase):
    def create_app(self):
        # in-memory db
        app = create_app('sqlite://', True)
        app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = False
        return app

    def setUp(self):
        # set up data from our fixtures
        setup_database()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_home_response(self):
        response = self.client.get('/')
        self.assert200(response)

    def test_react_route(self):
        filename = [file for file in os.listdir("react") if file.startswith('runescrape') and file.endswith(".js")][0]
        response = self.client.get('/react/' + filename)
        self.assert200(response)
        self.assertIn("javascript", str(response.headers))

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
