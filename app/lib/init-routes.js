'use strict';

var jinglegrams = require('../routes/jinglegrams.js');
var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  app.get('/', d, function (req, res) {res.render('./views/home/index.ejs');});
  app.get('/:id', d, jinglegrams.show);
  app.post('/', d, jinglegrams.create);
  // app.get('/sampleModels', d, sampleModels.index);
  // app.get('/sampleModels/create', d, sampleModels.createPage);
  // app.get('/sampleModels/:id', d, sampleModels.show);
  // app.get('/sampleModels/edit/:id', d, sampleModels.edit);
  // app.get('/auth', d, users.auth);
  // app.post('/sampleModels/create', d, sampleModels.create);
  // app.post('/register', d, users.register);
  // app.post('/login', d, users.login);
  // app.post('/', d, jinglegrams.create);
  // app.post('/logout', d, users.logout);
  // app.post('/sampleModels/update/:id', d, sampleModels.update);
  // app.post('/sampleModels/delete/:id', d, sampleModels.remove);
  app.get('/*', d, function (req, res) {res.render('./views/404.ejs', {url:req.url});});
  console.log('Routes Loaded');
  fn();
}
