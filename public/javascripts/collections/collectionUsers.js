var UsersCollection = Backbone.Collection.extend({
  // purpose // holds users client side
  // fetches them too
  // use // this // as example when making new collection
  model: User,
  url: '/users'
});