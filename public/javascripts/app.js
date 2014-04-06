var Router = Backbone.Router.extend({
  initialize: function(options) {
    _.extend(this, options);
  },
  routes: {
    '': 'latestTip'
  },
  latestTip: function() {
    console.log('latestTip>>>');
  }
});
