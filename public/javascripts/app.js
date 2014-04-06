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
  }
});

var LatestTipContentView = View.extend({
  tagName: 'div',
  render: function() {
    // shows latest tip for home page

    var template = $('#latest-tip-content-template').html();

    var compiled = Handlebars.compile(template)

    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});

var LatestTipTimeView = View.extend({
  tagName: 'div',
  render: function() {
    // shows latest tip time created for home page

    var template = $('#latest-tip-time-template').html();

    var compiled = Handlebars.compile(template)

    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});

var LatestTipTagView = View.extend({
  tagName: 'div',
  render: function() {
    // shows latest tip time created for home page

    var template = $('#latest-tip-tag-template').html();

    var compiled = Handlebars.compile(template)

    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});

var TipsController = function() {
  var root = this;

  root.set = function(settings) {
    // set whatever

    for(var key in settings) root[key] = settings[key];

    return root;
  
  };

  root.get = function(key) {
    // get whatever

    return root[key];
  };
};

var tipsControllerOptions = function(options) {
  // place controller options

  if(!options) {
    options = {
      collection: new TipsCollection(),
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
    console.log('latestTip>>>');
  }
});
