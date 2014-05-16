var CommentsCollection = Backbone.Collection.extend({
  model: Comment,
  url: '/comments',
  reset: function(models, options) {
    return Backbone.Collection.prototype.reset.call(this, models, options);
  }
});