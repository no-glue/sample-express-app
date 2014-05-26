var Users = Backbone.Collection.extend({
  model: User,
  url: '/users',
  reset: function(models, options) {
    return Backbone.Collection.prototype.reset.call(this, models, options);
  }
});