var factory = (function() {
  var Factory = function() {
    var root = this;

    root.create = function(object) {
      var get = require(object);

      return new get();
    }
  };

  return new Factory();
})();

module.exports = factory;