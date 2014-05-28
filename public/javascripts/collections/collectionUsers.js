var UsersCollection = Backbone.Collection.extend({
  model: User,
  fetchUserUrl: '/users/single',
  usersUrl: '/users',
  currentUrl: '/users',
  set: function(options) {
    // set options

    for(var key in options) this[key] = options[key];

    return this;
  },
  get: function(key) {
    // get key
    return this[key];
  },
  url: function() {
    // get current url

    return this.currentUrl;
  },
  reset: function(models, options) {
    // reset collection
    
    return Backbone.Collection.prototype.reset.call(this, models, options);
  }
});