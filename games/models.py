from flask.ext.mongoengine import MongoEngine
from games import app
import datetime

app.config["MONGODB_SETTINGS"] = {'DB': "gameswebsite"}
app.config["SECRET_KEY"] = "Iwantthistobesecret"

db = MongoEngine(app)

class Register_User(db.Document):
    email = db.StringField(required=True)
    alias = db.StringField(required=True)
    reg_date = db.DateTimeField(default=datetime.datetime.now())
    password = db.StringField(required=True)
