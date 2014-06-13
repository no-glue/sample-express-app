var TipsCollection = Backbone.Collection.extend({
  model: Tip,
  url: '/tips'
});