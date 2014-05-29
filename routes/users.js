var users = (function(extend) {
  extend.all = function(req, res) {
    // get all users
    extend.get('database')[extend.get('collection')].find().limit(1).sort({_id: -1}, function(err, users) {
    // extend.get('database')[extend.get('collection')].find().limit(16384).sort({_id: -1}, function(err, users) {
      console.log('all>>>', req.body);
      if(err) return;

      res.json(users);
    });
  };

  extend.single = function(req, res) {
    // get single user according to email
    var email = req.params.email;

    extend.get('database')[extend.get('collection')].find({email: email}, function(err, users) {
      if(err) return;

      res.json(users);
    });
  };

  extend.create = function(req, res) {
    // create user
    extend.get('database')[extend.get('collection')].save(req.body, function(err, saved) {
      res.json(req.body);
    });
  };

  return extend;
})(require('./factory').create('./setup'));

module.exports = users.set({
  database: require('../database'),
  collection: 'users'
});