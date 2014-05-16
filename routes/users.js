var users = (function(extend) {
  extend.create = function(req, res) {
    // adds a user
    extend.get('database')[extend.get('collection')].save(req.body, function(err, saved) {
      res.json(req.body);
    });
  };

  extend.comment = function(req, res) {

  };

  return extend;
})(require('./factory').create('./setup'));

module.exports = users.set({
  database: require('../database'),
  collection: 'users'
});