from flask import render_template, jsonify
from app import db
from app.errors import bp

@bp.app_errorhandler(404)
def page_not_found(e):
    return jsonify(error=404, text=str(e)), 404

@bp.errorhandler(500)
def internal_server_error(e):
    return jsonify(error=500, text=str(e)), 500
