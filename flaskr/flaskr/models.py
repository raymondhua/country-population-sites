# -*- coding:utf-8 -*-

import mongoengine

class Country(mongoengine.Document):
    name = mongoengine.StringField()
    code = mongoengine.StringField()
    in1960 = mongoengine.StringField()
    in1970 = mongoengine.StringField()
    in1980 = mongoengine.StringField()
    in1990 = mongoengine.StringField()
    in2000 = mongoengine.StringField()
    in2010 = mongoengine.StringField()
    in2016 = mongoengine.StringField()

class Region(mongoengine.Document):
    name = mongoengine.StringField()
    code = mongoengine.StringField()
    in1960 = mongoengine.StringField()
    in1970 = mongoengine.StringField()
    in1980 = mongoengine.StringField()
    in1990 = mongoengine.StringField()
    in2000 = mongoengine.StringField()
    in2010 = mongoengine.StringField()
    in2016 = mongoengine.StringField()
