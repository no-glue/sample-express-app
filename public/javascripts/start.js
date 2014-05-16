(function(options) {
  var router = new Router(options);

  Backbone.history.start();
})({
  urls: {
    indexRoute: 'tipsController',
    createRoute: 'tipsController',
    searchRoute: 'tipsController',
    tagRoute: 'tipsController',
    commentsRoute: 'commentsController'
  },
  controllers: {
    tipsController: new TipsController()
      .set(_.extend(options(), tipsControllerOptions()))
      .initialize(),
    commentsController: new CommentsController()
      .set(_.extend(options(), commentsControllerOptions()))
      .initialize()
  }
});
