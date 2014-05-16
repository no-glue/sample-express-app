var comments = (function(extend) {
  extend.create = function(req, res) {
    // adds a comment
    extend.get('database')[extend.get('collection')].save(req.body, function(err, saved) {
      res.json(req.body);
    });
  };

  return extend;
})(require('./factory').create('./setup'));

module.exports = comments.set({
  database: require('../database'),
  collection: 'comments'
});