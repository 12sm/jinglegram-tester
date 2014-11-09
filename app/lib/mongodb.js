'use strict';

var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost/jinglegram';

module.exports = function(url, cb){
  MongoClient.connect(url, function(err, db){
    global.jinglegram = db;
    console.log('Express: Database', url);
    if(cb){cb();}
  });
};
