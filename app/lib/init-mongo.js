'use strict';

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:3000/' + 'jinglegram';
var initialized = false;

exports.connect = function(req, res, next){
  if(!initialized){
    initialized = true;
    exports.db(next);
  }else{
    next();
  }
};

exports.db = function(fn){
  MongoClient.connect(mongoUrl, function(err, db) {
    if(err){throw err;}
    global.jinglegram = {};
    global.jinglegram.db = db;
    console.log('Connected to MongoDB');
    fn();
  });
};
