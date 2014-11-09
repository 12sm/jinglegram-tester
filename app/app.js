'use strict';

var db         = 'jinglegram';
var express    = require('express');
var app        = express();
var path       = require('path');
var initRoutes = require('./lib/init-routes.js');
var port       = 3000;
var url        = 'mongodb://localhost/' + db;
require('./lib/mongodb.js')(url);
app.set('views', __dirname, 'views');
app.set('view engine', 'ejs');

//-------- PIPELINE BEGINS --------//
app.use(initRoutes);
//app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
//-------- PIPELINE ENDS --------//

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening on port ' + port);
});

module.exports = app;
