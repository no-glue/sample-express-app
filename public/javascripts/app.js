var Tip = Backbone.Model.extend({
  idAttribute: '_id'
});

var TipsCollection = Backbone.Collection.extend({
  model: Tip,
  url: '/tips',
  reset: function(models, options) {
    // resets collection

    var newModels = [];

    _.each(models, function(model) {
      if(_.isUndefined(this.get(model._id))) newModels.push(model);
    }, this);

    return Backbone.Collection.prototype.reset.call(this, newModels, options);
  }
});

var View = Backbone.View.extend({
  set: function(settings) {
    // set whatever

    for(var key in settings) this[key] = settings[key];

    return this;
  },
  date: function(id) {
    // gets document created date

    var timestamp = id.toString().substring(0, 8);

    return new Date(parseInt(timestamp, 16) * 1000);
  }
});

var LatestTipContentView = View.extend({
  tagName: 'div',
  render: function() {
    // shows latest tip for home page

    var template = $('#latestTipContentTemplate').html();

    var compiled = Handlebars.compile(template);

    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});

var LatestTipTimeView = View.extend({
  tagName: 'div',
  render: function() {
    // shows latest tip time created for home page

    var template = $('#latestTipTimeTemplate').html();

    var compiled = Handlebars.compile(template);

    var html = compiled({date: this.date(this.model.attributes._id)});

    this.$el.html(html);

    return this;
  }
});

var LatestTipTagView = View.extend({
  tagName: 'div',
  render: function() {
    // shows latest tip time created for home page

    var template = $('#latestTipTagTemplate').html();

    var compiled = Handlebars.compile(template);

    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});

var LatestTipView = View.extend({
  tagName: 'div',
  render: function() {
    // show latest tip on home page

    var latestTipContentView = new LatestTipContentView();

    this.$el.append(latestTipContentView.set({model: this.model}).render().el);

    var latestTipTimeView = new LatestTipTimeView();

    this.$el.append(latestTipTimeView.set({model: this.model}).render().el);

    var latestTipTagView = new LatestTipTagView();

    this.$el.append(latestTipTagView.set({model: this.model}).render().el);

    return this;
  }
});

var TipsController = function() {
  var root = this;

  root.initialize = function() {
    // initialize things

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

  root.latestTip = function() {
    // shows latest tip

    var model = root.get('collection').shift();

    if(model) {
      root.get('selector')(root.get('element')).html(root.get('latestTipView').render().el);

      root.get('collection').unshift(model);
    } else {
      var deferred = root.fetch();

      deferred.then(function(arg) {
        model = root.get('collection').shift();

        root.get('selector')(root.get('element')).html(root.get('latestTipView').set({model: model}).render().el);

        root.get('collection').unshift(model);
      });
    }
  }
};

var tipsControllerOptions = function(options) {
  // place controller options

  if(!options) {
    options = {
      collection: new TipsCollection(),
      latestTipView: new LatestTipView(),
      element: '#app'
    };
  }

  return options;
};

var options = function(options) {
  // options used a lot

  if(!options) {
    options = {
      assure: assure,
      selector: $
    }
  }

  return options;
};

var Router = Backbone.Router.extend({
  initialize: function(options) {
    _.extend(this, options);
  },
  routes: {
    '': 'latestTip'
  },
  latestTip: function() {
    this.controllers[this.urls.indexRoute].latestTip();
  }
});
