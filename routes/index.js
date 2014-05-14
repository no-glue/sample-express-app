
/*
 * GET home page.
 */

var Tips = function() {
  var root = this;

  root.setDatabase = function(database) {
    // sets database to use
    root.database = database;

    return root;
  };

  root.getDatabase = function() {
    // gets database to use
    return root.database;
  };

  root.index = function(req, res) {
    // show index view
    res.render('index', {title: 'Tip'});
  };

  root.all = function(req, res) {
    // gets all tips
    root.getDatabase().tips.find().limit(16384).sort({_id: -1}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

  root.tip = function(req, res) {
    // gets a tip according to id
    var db = root.getDatabase();

    var id = db.ObjectId(req.params.id);

    db.tips.findOne({_id: id}, function(err, tip) {
      if(err) return;

      res.json(tip);
    });
  };

  root.tag = function(req, res) {
    // gets tips according to tag
    var tag = req.params.name;

    root.getDatabase().tips.find({tag: tag}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

  root.name = function(req, res) {
    // gets tips according to name
    var name = req.params.name;

    root.getDatabase().tips.find({name: name}, function(err, tips) {
      if(err) return;

      res.json(tips);
    });
  };

  root.create = function(req, res) {
    // adds a tip
    root.getDatabase().tips.save(req.body, function(err, saved) {
      res.json(req.body);
    });
  }

  root.update = function(req, res) {
    // updates tip

    var db = root.getDatabase();

    var id = db.ObjectId(req.body._id);

    delete req.body._id;

    root.getDatabase().tips.update({_id: id}, {$set: req.body}, function(err, lastErrorObject) {
      req.body._id = id;

      res.json(req.body);        
    });
  }
};

var tips = new Tips()
  .setDatabase(require('../database'));

exports.tips = tips;
