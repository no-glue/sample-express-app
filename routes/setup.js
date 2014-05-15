var setup = (function() {
  var Setup = function() {
    var self = this;

    self.set = function(options) {
      // set options
      for(var key in options)self[key] = options[key];

      return self;
    };

    self.get = function(key) {
      // get key
      return self[key];
    };
  };

  return new Setup();
})();

module.exports = setup;