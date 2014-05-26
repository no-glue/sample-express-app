var users = (function(extend) {
  extend.all = function(req, res) {
    // get all users
    extend.get('database')[extend.get('collection')].find().limit(16384).sort({_id: -1}, function(err, tips) {
      if(err) return;

      res.json(tips);
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