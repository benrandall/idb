import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.flask_environment'))

class Config(object):
    DEBUG = os.environ.get('DEBUG') or False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ELASTICSEARCH_URL = os.environ.get('ELASTICSEARCH_URL')
    GITHUB_API_TOKEN = os.environ.get('GITHUB_API_TOKEN')
    POSTS_PER_PAGE = 25
