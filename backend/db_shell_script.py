
from models import db, Video, Reddit, Item, Skill

db.reflect()
db.drop_all()
db.create_all()
v = Video(name='99crafting in 20 mins', icon='linkerino', video_url='url', category='gaming')
v2 = Video(name='99smithing in 20 mins', icon='linkerino', video_url='url', category='gaming')
r = Reddit(url='redditurl', title='99 crafting in 20 mins')
s = Skill(name='crafting', icon='iconurl', description='the worst skill', members_only=False, max_level=99)
db.session.commit()
s.videos.append(v)
s.videos.append(v2)
s.reddits.append(r)
print(s.videos.all())
print(s.reddits.all())
