import logging
import os
from flask import Flask, request, current_app
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from flask_migrate import Migrate
from elasticsearch import Elasticsearch
from config import Config

db = SQLAlchemy()
migrate = Migrate()

from app import models

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    app.elasticsearch = Elasticsearch([app.config['ELASTICSEARCH_URL']]) \
        if app.config['ELASTICSEARCH_URL'] else None

    api_manager = APIManager(app, flask_sqlalchemy_db=db)
    api_manager.create_api(models.Item, methods=['GET'], url_prefix='')
    api_manager.create_api(models.Skill, methods=['GET'], url_prefix='')
    api_manager.create_api(models.Video, methods=['GET'], url_prefix='')
    api_manager.create_api(models.Reddit, methods=['GET'], url_prefix='')

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from app.api import bp as main_bp
    app.register_blueprint(main_bp)

    CORS(app)

    return app
