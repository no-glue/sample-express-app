var UserFetch = Backbone.Model.extend({
  url: function() {
    return '/users/single/' + this.email;
  },
  set: function(options) {
    for(var key in options) this[key] = options[key];

    return this;
  },
  get: function(key) {
    return this[key];
  }
});