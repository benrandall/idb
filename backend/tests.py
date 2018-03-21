from flask import Flask
from flask_testing import TestCase
from main import create_app, db

class IdbTests(TestCase):

     def create_app(self):
        app = Flask(__name__)
        app.config['TESTING'] = True
        return app
    pass

if __name__ == '__main__':
    unittest.main()
