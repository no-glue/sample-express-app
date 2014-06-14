var extendControllerTips = (function(extend, options) {
  // purpose // works with tips
  // use // this // to make decisions about tips

  extend.set(options);

  extend.initialize = function() {
    // initialize things

    extend.react('tag:create', extend.created);

    extend.react('tip:report', extend.reported);

    extend.react('text:search', extend.searched);

    return extend;
  };

  extend.created = function(event) {
    // created tip

    extend.get('collection').create(event, {
      wait: true,
      success: function(response) {
        extend.navigate('home');
      }
    });
  };

  extend.reported = function(event) {
    // tip reported

    var deferred = extend.saveModel(event, {reported: true});

    deferred.then(function(arg) {
    });
  };

  extend.searched = function(event) {
    // text searched

    extend.get('selector')(extend.get('elementSearchResultsShow')).html(extend.get('tagTipsView').set({models: extend.filter(event.search)}).render().el);
  };

  extend.latestTip = function() {
    // shows latest tip
    // todo fetch only latest tip

    var deferred = extend.fetch();

    deferred.then(function(arg) {
      extend.get('selector')(extend.get('element')).html(extend.get('latestTipView').set({collection: extend.get('collection')}).render().el);
    });
  };

  extend.create = function() {
    // shows page to create tip

    if(extend.get('cookies').get('user') != undefined) {
      var deferred = extend.fetch();

      deferred.then(function(arg) {
        extend.get('selector')(extend.get('element')).html(extend.get('tagCreateFormView').render().el);
      });
    } else extend.clearAndNavigate('home');
  };

  extend.search = function() {
    // does search for a term in collection

    var deferred = extend.fetch();

    deferred.then(function(arg) {
      extend.get('selector')(extend.get('element')).html(extend.get('searchView').render().el);
    });
  };

  extend.tag = function(tag) {
    // gets tips tagged with tag

    var models = extend.get('collection').where({tag: tag});

    if(models && models.length) {
      extend.get('selector')(extend.get('element')).html(extend.get('tagTipsView').set({models: models}).render().el);
    } else {
      var deferred = extend.fetch();

      deferred.then(function(arg) {
        var models = extend.get('collection').where({tag: tag});

        extend.get('selector')(extend.get('element')).html(extend.get('tagTipsView').set({models: models}).render().el);
      }); 
    }
  };

  extend.initialize();

  return extend;
})(
  new Controller(),
  {
    assure: assure,
    selector: $,
    cookies: CookieJS,
    // common
    // todo don't repeat so much
    collection: new TipsCollection(),
    latestTipView: new LatestTipView(),
    tagTipsView: new TagTipsView(),
    tagCreateFormView: new TagCreateFormView(),
    searchView: new SearchView(),
    element: '#app',
    elementSearchResultsShow: '#searchResultsShow'
  }
);