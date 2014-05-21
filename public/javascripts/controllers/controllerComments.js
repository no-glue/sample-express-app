var CommentsController = function() {
  var root = this;

  root.initialize = function() {
    // initialize things
    // as in controllerTips e.g.

    root.react('comment:create', root.created);

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

  root.filter = function(term, field) {
    // searches for term

    if(!field) field = 'text';

    return root.get('collection').filter(function(model) {
      var value = model.get(field);

      if(typeof value === 'undefined') return false;

      return value.toLowerCase().indexOf(term.toLowerCase()) !== -1;
    });
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
    // comment is created

    console.log('created>>>', event);
  };

  root.create = function(postId) {
    // create comment for tag

    var deferred = root.fetch();

    deferred.then(function(arg) {
      root.get('selector')(root.get('element')).html(root.get('commentCreateFormView').set({postId: {postId: postId}}).render().el);
    });
  };

  root.comments = function(postId) {
    // show comments for tag

    var models = root.get('collection').where({postId: postId});

    if(models && models.length) {
      root.get('selector')(root.get('element')).html(root.get('commentsView').set({models: models}).render().el);
    } else {
      var deferred = root.fetch();

      deferred.then(function(arg) {
        var models = root.get('collection').where({postId: postId});

        root.get('selector')(root.get('element')).html(root.get('commentsView').set({models: models}).render().el);
      }); 
    }
  };
};