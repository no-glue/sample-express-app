var tips = (function(setup) {
  setup.index = function(req, res) {
    // show index view
    res.render('index', {title: 'Tip'});
  };

  setup.all = function(req, res) {
    // gets all tips
    setup.get('database')[setup.get('collection')].find().limit(16384).sort({_id: -1}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

  setup.tip = function(req, res) {
    // gets a tip according to id
    var db = setup.get('database');

    var id = db.ObjectId(req.params.id);

    db[setup.get('collection')].findOne({_id: id}, function(err, tip) {
      if(err) return;

      res.json(tip);
    });
  };

  setup.tag = function(req, res) {
    // gets tips according to tag
    var tag = req.params.name;

    setup.get('database')[setup.get('collection')].find({tag: tag}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

  setup.name = function(req, res) {
    // gets tips according to name
    var name = req.params.name;

    setup.get('database')[setup.get('collection')].find({name: name}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

  setup.create = function(req, res) {
    // adds a tip
    setup.get('database')[setup.get('collection')].save(req.body, function(err, saved) {
      res.json(req.body);
    });
  };

  setup.update = function(req, res) {
    // updates tip
    var db = setup.get('database');

    var id = db.ObjectId(req.body._id);

    delete req.body._id;

    setup.getDatabase()[setup.get('collection')].update({_id: id}, {$set: req.body}, function(err, lastErrorObject) {
      req.body._id = id;

      res.json(req.body);        
    });
  };

  return setup;
})(require('./setup'));

exports.tips = tips.set({
  database: require('../database'),
  collection: 'tips'
});