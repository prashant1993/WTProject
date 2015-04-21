from flask import request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify, Response
import requests
from datetime import datetime
from time import strptime
from pymongo import MongoClient
from bson.objectid import ObjectId
from games import app
from games.models import Register_User

@app.route('/',methods=['GET','POST'])
@app.route('/index',methods=['GET','POST'])
def homepage():
    if(request.method=='POST'):
        if 'signin' in request.form:
            print 'Trying to sign-in'
            print request.form
        elif 'Email' in request.form:
            new_user = Register_User()
            new_user.email = request.form['Email']
            new_user.alias = request.form['userid']
            new_user.password = request.form['password']
            new_user.save()
    return render_template("index.html")

@app.route('/spacegame')
def spacegame():
    items=[['Prashant','2'],['Rahul','3'],['Piyush','4']]
    lenloop = len(items)
    return render_template("SpaceGame.html",items=items,lenloop=lenloop)

@app.route('/flipgame')
def flipgame():
    items=[['Prashant','2'],['Rahul','3'],['Piyush','4']]
    lenloop = len(items)
    return render_template("Flip Game.html",items=items,lenloop=lenloop)

@app.route('/floodit')
def floodit():
    return render_template("floodit.html")
