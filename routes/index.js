var tips = (function(extend) {
  extend.index = function(req, res) {
    // show index view
    res.render('index', {title: 'Tip'});
  };

  extend.all = function(req, res) {
    // gets all tips
    extend.get('database')[extend.get('collection')].find().limit(16384).sort({_id: -1}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

  extend.tip = function(req, res) {
    // gets a tip according to id
    var db = extend.get('database');

    var id = db.ObjectId(req.params.id);

    db[extend.get('collection')].findOne({_id: id}, function(err, tip) {
      if(err) return;

      res.json(tip);
    });
  };

  extend.tag = function(req, res) {
    // gets tips according to tag
    var tag = req.params.name;

    extend.get('database')[extend.get('collection')].find({tag: tag}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

  extend.name = function(req, res) {
    // gets tips according to name
    var name = req.params.name;

    extend.get('database')[extend.get('collection')].find({name: name}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

  extend.create = function(req, res) {
    // adds a tip
    extend.get('database')[extend.get('collection')].save(req.body, function(err, saved) {
      res.json(req.body);
    });
  };

  extend.update = function(req, res) {
    // updates tip
    var db = extend.get('database');

    var id = db.ObjectId(req.body._id);

    delete req.body._id;

    extend.get('database')[extend.get('collection')].update({_id: id}, {$set: req.body}, function(err, lastErrorObject) {
      req.body._id = id;

      res.json(req.body);        
    });
  };

  return extend;
})(require('./factory').create('./setup'));

exports.tips = tips.set({
  database: require('../database'),
  collection: 'tips'
});