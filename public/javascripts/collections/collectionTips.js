var TipsCollection = Backbone.Collection.extend({
  // purpose // holds tips client side
  // fetches them too
  // use // this // as example when making new collection
  model: Tip,
  url: '/tips'
});