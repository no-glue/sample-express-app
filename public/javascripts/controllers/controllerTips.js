var TipsController = function() {
  var root = this;

  root.initialize = function() {
    // initialize things

    root.react('tag:create', root.created);

    root.react('tip:report', root.reported);

    return root;
  };

  root.set = function(settings) {
    // set whatever

    for(var key in settings) root[key] = settings[key];

    return root;
  
  };

  root.get = function(key) {
    // get whatever

    return root[key];
  };

  root.fetch = function() {
    // fetches collection

    var deferred = root.assure();

    root.get('collection').fetch({reset: true, success: function(model, response) {
      deferred.resolve(model.lenght);
    }});

    return deferred;
  };

  root.saveModel = function(id, params) {
    // saves model

    var model = root.get('collection').get(id);

    var deferred = root.assure();

    model.save(params, {
      wait: true,
      success: function(model, response) {
        deferred.resolve(model);
    }});

    return deferred;
  };

  root.react = function(event, handler, object, panel) {
    // react on event

    if(!object) object = root.get('root');

    if(!panel) panel = controlPanel;

    panel.getEvents().bind(event, handler, object);
  };

  root.created = function(event) {
    // created tip

    root.get('collection').create(event, {
      wait: true,
      success: function(response) {
        root.navigate('home');
      }
    });
  };

  root.reported = function(event) {
    // tip reported

    var deferred = root.saveModel(event, {reported: true});

    deferred.then(function(arg) {
    });
  };

  root.latestTip = function() {
    // shows latest tip
    // todo fetch only latest tip

    var deferred = root.fetch();

    deferred.then(function(arg) {
      root.get('selector')(root.get('element')).html(root.get('latestTipView').set({collection: root.get('collection')}).render().el);
    });
  };

  root.create = function() {
    // shows page to create tip

    var deferred = root.fetch();

    deferred.then(function(arg) {
      root.get('selector')(root.get('element')).html(root.get('tagCreateFormView').render().el);
    });
  };

  root.search = function() {
    // does search for a term in collection
    console.log('search>>>');
  };

  root.tag = function(tag) {
    // gets tips tagged with tag
    // todo fetch only tips with tag

    var models = root.get('collection').where({tag: tag});

    if(models && models.length) {
      root.get('selector')(root.get('element')).html(root.get('tagTipsView').set({models: models}).render().el);
    } else {
      var deferred = root.fetch();

      deferred.then(function(arg) {
        var models = root.get('collection').where({tag: tag});

        root.get('selector')(root.get('element')).html(root.get('tagTipsView').set({models: models}).render().el);
      }); 
    }
  }
};