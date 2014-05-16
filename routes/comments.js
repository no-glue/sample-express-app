var comments = (function(extend) {
  extend.all = function(req, res) {
    // get all comments
    extend.get('database')[extend.get('collection')].find().limit(16384).sort({_id: -1}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

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