var CommentsCollection = Backbone.Collection.extend({
  // purpose // holds comments client side
  // fetches them too
  // use // this // as example when making new collection
  model: Comment,
  url: '/comments'
});