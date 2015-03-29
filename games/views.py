from flask import request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify, Response
import requests
from datetime import datetime
from time import strptime
from pymongo import MongoClient
from bson.objectid import ObjectId
from games import app

@app.route('/')
@app.route('/index')
def homepage():
    return render_template("index.html")

@app.route('/spacegame')
def spacegame():
    return render_template("SpaceGame.html")
