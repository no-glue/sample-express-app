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
  },
  clear: function() {
    // clears view

    this.$el.html('');
  }
});

var LatestTipContentView = View.extend({
  tagName: 'div',
  className: 'line',
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
  className: 'line',
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
  className: 'line',
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
  className: 'centre',
  render: function() {
    // show latest tip on home page

    this.clear();

    var latestTipContentView = new LatestTipContentView();

    this.$el.append(latestTipContentView.set({model: this.model}).render().el);

    var latestTipTimeView = new LatestTipTimeView();

    this.$el.append(latestTipTimeView.set({model: this.model}).render().el);

    var latestTipTagView = new LatestTipTagView();

    this.$el.append(latestTipTagView.set({model: this.model}).render().el);

    return this;
  }
});

var TagTipsView = View.extend({
  tagName: 'div',
  className: 'centre',
  render: function() {
    // show tips tagged with a tag

    this.clear();
    
    for(var i = 0, len = this.models.length; i < len; i++) {
      var latestTipView = new LatestTipView();

      this.$el.append(latestTipView.set({model: this.models[i]}).render().el);
    }

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
    // todo fetch only latest tip

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

var tipsControllerOptions = function(options) {
  // place controller options

  if(!options) {
    options = {
      collection: new TipsCollection(),
      latestTipView: new LatestTipView(),
      tagTipsView: new TagTipsView(),
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
    '': 'latestTip',
    'tags/:tag': 'tag'
  },
  latestTip: function() {
    this.controllers[this.urls.indexRoute].latestTip();
  },
  tag: function(tag) {
    this.controllers[this.urls.tagRoute].tag(tag);
  }
});
