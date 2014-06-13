var CommentsCollection = Backbone.Collection.extend({
  model: Comment,
  url: '/comments'
});