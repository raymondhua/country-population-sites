# Flask app - running via NGNIX on port 80
# NGNIX file - /etc/nginx/sites-enabled/flask-settings

#all the imports
import os
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, json, jsonify
from mongoengine import * #imports mongo engine
from .models import * #imports models file
import csv

# creates the application instance :)
app = Flask(__name__) 
app.secret_key = 'secrety'

# load config from this file , flaskr.py
app.config.from_object(__name__)

# Connects to the mongo database
connect('admin',
    host = '127.0.0.1',
    port = 27017,
    username = 'huar2',
    password = 'huaR21day' )
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

# Function that displays the home screen
@app.route('/')
def show_home():
       countries = Country.objects() #.objects() gets all the data from a certian model
       return render_template('home.html', countries=countries) # Returns a page with the countries

# Function that displays the region screen
@app.route('/region')
def show_region():
       regions = Region.objects()
       return render_template('region.html', regions=regions)

# Function that displays all countries and their population
@app.route('/showAll')
def show_all():
       countries = Country.objects()
       return render_template('showAll.html', countries=countries)
    
# Function that displays my inspirations
@app.route('/inspirations')
def show_inspirations():
       return render_template('inspirations.html') # Returns a page with the countries
       
# Function that adds the CSV files
@app.route('/add', methods=['GET', 'POST'])
def add_countries():
        Country.objects().delete()
        Region.objects().delete()
        with open("/home/user/flaskr/flaskr/static/csv/worldpop.csv") as f_obj:
              reader = csv.DictReader(f_obj, delimiter=',')
              for line in reader:
                     country = Country(
                     name = line['Country Name'],
                     code = line['Country Code'],
                     in1960 = line['1960'],
                     in1970 = line['1970'],
                     in1980 = line['1980'],
                     in1990 = line['1990'],
                     in2000 = line['2000'],
                     in2010 = line['2010'],
                     in2016 = line['2016']
                     )
                     country.save()
        with open("/home/user/flaskr/flaskr/static/csv/regionpop.csv") as f_obj:
              reader = csv.DictReader(f_obj, delimiter=',')
              for line in reader:
                     region = Region(
                     name = line['Country Name'],
                     code = line['Country Code'],
                     in1960 = line['1960'],
                     in1970 = line['1970'],
                     in1980 = line['1980'],
                     in1990 = line['1990'],
                     in2000 = line['2000'],
                     in2010 = line['2010'],
                     in2016 = line['2016']
                     )
                     region.save()
        return show_home()
    
# Function that gets the API for Countries
# If the function gets a code it displays only the chosen API
# Otherwise, it would display all countries (e.g. ctry_code=None = ctry_code's default parameter would be None by default)
# Returns 404 error if country code does not match any queries
@app.route('/countries/', methods=['GET'])
@app.route('/countries/<ctry_code>', methods=['GET'])
def getPopulation(ctry_code=None):
    countries = None
    if ctry_code is None:
        countries = Country.objects
    else:
        try:
            countries = Country.objects.get(code=ctry_code.upper())
        except Country.DoesNotExist:
            return jsonify({'message': 'Country not found'}), 404
    jsonArray = countries.to_json()
    return countries.to_json()

# Function that gets the API for Regions
# If the function gets a code it displays only the chosen API
# Otherwise, it would display all regions (e.g. regn_code=None = regn_code's default parameter would be None by default)
# Returns 404 error if region code does not match any queries
@app.route('/regions/', methods=['GET'])
@app.route('/regions/<regn_code>', methods=['GET'])
def getRegion(regn_code=None):
    regions = None
    if regn_code is None:
        regions = Region.objects
    else:
        try:
            regions = Region.objects.get(code=regn_code.upper())
        except Region.DoesNotExist:
            return jsonify({'message': 'Region not found'}), 404
    return regions.to_json()

# Function that handles 404
@app.errorhandler(404)
def page_not_found(e):
    # Returns an bootsrapped error page displaying the 404 error
    return render_template('404.html'), 404

# Function that handles 500
@app.errorhandler(500)
def internal_server_error(e):
    # Returns an bootsrapped error page displaying the 500 error
    return render_template('500.html'), 404

