var UsersCollection = Backbone.Collection.extend({
  model: User,
  url: '/users',
  reset: function(models, options) {
    // reset collection

    return Backbone.Collection.prototype.reset.call(this, models, options);
  }
});