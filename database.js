var dbUrl = 'mongodb://user:pass@host:port/app' || 'tips';

var collections = ['tips', 'comments', 'users'];

var db = require('mongojs').connect(dbUrl, collections);

module.exports = db;
