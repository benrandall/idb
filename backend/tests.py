import os
import unittest
from flask import Flask
from flask_testing import TestCase
from main import create_app, db


class IdbTests(TestCase):
    def create_app(self):
        # in-memory db
        app = create_app('sqlite://', True)
        return app

    def setUp(self):
        # set up data from our fixtures
        import import_fixture

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_home_response(self):
        response = self.client.get('/')
        self.assert200(response)


if __name__ == '__main__':
    unittest.main()
