var users = (function(extend) {
  extend.all = function(req, res) {
    // get all users
    extend.get('database')[extend.get('collection')].find().limit(16384).sort({_id: -1}, function(err, users) {
      if(err) return;

      res.json(users);
    });
  };

  extend.single = function(req, res) {
    // get single user according to email
    var find = {
      email: req.params.email,
      password: extend.encrypt(req.params.email, req.params.password)
    };

    extend.get('database')[extend.get('collection')].find(find, function(err, users) {
      if(err) return;

      res.json(users);
    });
  };

  extend.create = function(req, res) {
    // create user
    var save = {
      email: req.body.email,
      password: extend.encrypt(req.body.email, req.body.password)
    };

    extend.get('database')[extend.get('collection')].save(save, function(err, saved) {
      res.json(save);
    });
  };

  extend.objectId = function(req, res, next) {
    // transform userId to object
    req.body.userId = extend.get('database').ObjectId(req.body.userId);

    next();
  };

  extend.id = function(req, res, next) {
    // check for user id in request
    if(req.body.userId == undefined) {
      res.json([]);

      res.end();
    } else {
      extend.get('database')[extend.get('collection')].find({_id: req.body.userId}).count(function(err, count) {
        if(!count) {
          res.json([]);

          res.end();
        }

        next();
      });
    }
  };

  return extend;
})(require('./factory').create('./setup'));

module.exports = users.set({
  database: require('../database'),
  collection: 'users'
});