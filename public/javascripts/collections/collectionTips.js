var TipsCollection = Backbone.Collection.extend({
  model: Tip,
  url: '/tips',
  reset: function(models, options) {
    return Backbone.Collection.prototype.reset.call(this, models, options);
  }
});