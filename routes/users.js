var users = (function(extend) {
  extend.create = function(req, res) {
    // adds a user
    extend.get('database')[extend.get('collection')].save(req.body, function(err, saved) {
      res.json(req.body);
    });
  };

  return extend;
})(require('./setup'));

module.exports = users.set({
  database: require('../database'),
  collection: 'users'
});