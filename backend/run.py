from app import create_app, db, cli
from app.models import Item, Skill, Reddit, Video

app = create_app()
cli.register(app)

@app.shell_context_processor
def make_shell_context():
    return {'db': db,
            'Item': Item,
            'Skill': Skill,
            'Reddit': Reddit,
            'Video': Video }
