var tips = (function() {
  var Tips = function() {
    var root = this;

    root.set = function(options) {
      // set options
      for(var key in options)root[key] = options[key];

      return root;
    };

    root.get = function(key) {
      // get key
      return root[key];
    };

    root.index = function(req, res) {
      // show index view
      res.render('index', {title: 'Tip'});
    };

    root.all = function(req, res) {
      // gets all tips
      root.get('database')[root.get('collection')].find().limit(16384).sort({_id: -1}, function(err, tips) {
        if(err) return;

        res.json(tips);
      });
    };

    root.tip = function(req, res) {
      // gets a tip according to id
      var db = root.get('database');

      var id = db.ObjectId(req.params.id);

      db[root.get('collection')].findOne({_id: id}, function(err, tip) {
        if(err) return;

        res.json(tip);
      });
    };

    root.tag = function(req, res) {
      // gets tips according to tag
      var tag = req.params.name;

      root.get('database')[root.get('collection')].find({tag: tag}, function(err, tips) {
        if(err) return;

        res.json(tips);
      });
    };

    root.name = function(req, res) {
      // gets tips according to name
      var name = req.params.name;

      root.get('database')[root.get('collection')].find({name: name}, function(err, tips) {
        if(err) return;

        res.json(tips);
      });
    };

    root.create = function(req, res) {
      // adds a tip
      root.get('database')[root.get('collection')].save(req.body, function(err, saved) {
        res.json(req.body);
      });
    };

    root.update = function(req, res) {
      // updates tip

      var db = root.get('database');

      var id = db.ObjectId(req.body._id);

      delete req.body._id;

      root.getDatabase()[root.get('collection')].update({_id: id}, {$set: req.body}, function(err, lastErrorObject) {
        req.body._id = id;

        res.json(req.body);        
      });
    };
  };

  return new Tips();
})();

exports.tips = tips.set({
  database: require('../database'),
  collection: 'tips'
});
