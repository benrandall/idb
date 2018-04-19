import logging
import os
from flask import Flask, request, current_app
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from flask_migrate import Migrate
from elasticsearch import Elasticsearch
from config import Config
from werkzeug.contrib.cache import SimpleCache
from functools import wraps


db = SQLAlchemy()
migrate = Migrate()
cache = SimpleCache()

from app import models

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    app.elasticsearch = Elasticsearch([app.config['ELASTICSEARCH_URL']]) \
        if app.config['ELASTICSEARCH_URL'] else None

    api_manager = APIManager(app, flask_sqlalchemy_db=db)
    api_manager.create_api(models.Item, methods=['GET'], url_prefix='', results_per_page=-1)
    api_manager.create_api(models.Skill, methods=['GET'], url_prefix='', results_per_page=-1)
    api_manager.create_api(models.Video, methods=['GET'], url_prefix='', results_per_page=-1)
    api_manager.create_api(models.Reddit, methods=['GET'], url_prefix='', results_per_page=-1)

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from app.api import bp as main_bp
    app.register_blueprint(main_bp)

    CORS(app)

    return app

def cached(timeout=1*60*60, key='view/%s'):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            cache_key = key % request.path
            rv = cache.get(cache_key)
            if rv is not None:
                return rv
            rv = f(*args, **kwargs)
            cache.set(cache_key, rv, timeout=timeout)
            return rv
        return decorated_function
    return decorator
