
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var comments = require('./routes/comments');
var users = require('./routes/users');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');
var compile = function(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(stylus.middleware({src: __dirname + '/public', compile: compile}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.tips.index);

app.get('/tips', routes.tips.all);

app.get('/tips/:id', routes.tips.tip);

app.get('/tips/tag/:name', routes.tips.tag);

app.get('/tips/name/:name', routes.tips.name);

app.post('/tips', routes.tips.create);

app.put('/tips', routes.tips.update);

app.get('/comments', comments.all);

app.post('/comments', comments.create);

app.get('/users', users.all);

app.post('/users', users.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
