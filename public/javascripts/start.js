(function(options) {
  var router = new Router(options);

  Backbone.history.start();
})({
  urls: {
    indexRoute: 'tipsController',
    createRoute: 'tipsController',
    tagRoute: 'tipsController'
  },
  controllers: {
    tipsController: new TipsController()
      .set(_.extend(options(), tipsControllerOptions()))
      .initialize()
  }
});
