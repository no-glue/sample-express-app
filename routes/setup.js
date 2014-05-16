var Setup = function() {
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
};

module.exports = Setup;