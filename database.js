var dbUrl = 'tips';
// live 'mongodb://heroku_app24172037:snm2u7bejp2qmu66nu61lav9lo@ds053718.mongolab.com:53718/heroku_app24172037'

var collections = ['tips', 'comments'];

var db = require('mongojs').connect(dbUrl, collections);

module.exports = db;
