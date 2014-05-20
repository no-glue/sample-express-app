var Router = Backbone.Router.extend({
  initialize: function(options) {
    _.extend(this, options);
  },
  routes: {
    '': 'latestTip',
    'home': 'latestTip',
    'tags/create': 'create',
    'tags/search': 'search',
    'tags/comments/create/:id': 'commentsCreate',
    'tags/comments/:id': 'comments',
    'tags/:tag': 'tag'
  },
  latestTip: function() {
    this.controllers[this.urls.indexRoute].latestTip();
  },
  create: function() {
    this.controllers[this.urls.createRoute].create();
  },
  search: function() {
    this.controllers[this.urls.searchRoute].search();
  },
  tag: function(tag) {
    this.controllers[this.urls.tagRoute].tag(tag);
  },
  comments: function(postId) {
    this.controllers[this.urls.commentsRoute].comments(postId);
  },
  commentsCreate: function(postId) {
    this.controllers[this.urls.commentsCreateRoute].create(postId);
  }
});