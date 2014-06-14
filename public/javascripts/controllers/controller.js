  var Controller = function() {
  // purpose // base controller
  // use // this // as base controller
  var root = this;

  root.set = function(options) {
    // set keys

    for(var key in options) root[key] = options[key];

    return root;
  };

  root.get = function(key) {
    // get key

    return root[key];
  };

  root.navigate = function(url, params, sep, refresh, navigator) {
    // navigate to url

    if(!sep) sep = '/';

    if(params && params.length) {
      url = url + sep;

      for(var i = 0, len = params.length; i < len; i++) url += params[i] + sep;

      url = url.substring(0, url.length - 1);
    }

    if(!refresh) refresh = true;

    if(!navigator) navigator = Backbone.history;

    navigator.navigate(url, refresh);
  };

  root.clearFragment = function() {
    // clear url

    Backbone.history.fragment = null;
  };

  root.clearAndNavigate = function(url, params, sep, refresh, navigator) {
    // clear and navigate
            
    this.clearFragment();

    this.navigate(url, params, sep, refresh, navigator);
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
};