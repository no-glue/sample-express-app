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

  root.getBlowfish = function() {
    // get blowfish
    var blowish = root.get('blowish');

    if(blowish === undefined) {
      var MCrypt = require('mcrypt').MCrypt;

      blowfish = new MCrypt('blowfish', 'cfb');

      root.set({blowfish: blowfish});
    }

    return blowfish;
  };

  root.getIv = function(blowfish) {
    // get blowfish initial vector
    var iv = root.get('iv');

    if(iv === undefined) {
      iv = blowfish.generateIv();

      root.set({iv: iv});
    }

    return iv;
  };

  root.encrypt = function(key, message, blowfish, iv) {
    // blowfish encrypt message
    if(!blowfish) blowfish = root.getBlowfish();

    if(!iv) iv = root.getIv(blowfish);

    blowfish.validateKeySize(false);

    blowfish.open(key, iv);

    return blowfish.encrypt(message).toString('base64');
  };
};

module.exports = Setup;