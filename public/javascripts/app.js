var Tip = Backbone.Model.extend({
  idAttribute: '_id'
});

var TipsCollection = Backbone.Collection.extend({
  model: Tip,
  url: '/tips',
  reset: function(models, options) {
    return Backbone.Collection.prototype.reset.call(this, models, options);
  }
});

var controlPanel = (function() {
  var ControlPanel = function() {
    var root = this;

    root.setEvents = function(callback, events) {
      // sets events

      if(!callback) callback = _.extend;

      if(!events) events = Backbone.Events;

      root.events = callback({}, events);

      return root;
    };

    root.getEvents = function() {
      // gets events

      if(typeof root.events === 'undefined') root.setEvents();

      return root.events;
    };
  }

  return new ControlPanel();
})();

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
  },
  unique: function(collection, field) {
    // gets unique models

    var models = collection.toJSON();

    var property = _.property(field);

    return _.uniq(models, property);
  },
  formJson: function(arr) {
    // turns array of objects to object

    var res = {};

    for(var i = 0, len = arr.length; i < len; i++) {
      var item = arr[i];

      res[item.name] = item.value;
    }

    return res;
  },
  trigger: function(event, params, panel) {
    // triggers event

    if(!panel) panel = controlPanel;

    panel.getEvents().trigger(event, params);
  },
  sortCid: function(models, direction) {
    // sorts models by cid

    if(!direction) direction = 1;

    return _.sortBy(this.models, function(model) {
      return direction * parseInt(model.cid.substring(1, model.cid.length));
    });
  },
  sortCidReverse: function(models) {
    // sorts models by cid reverse

    return this.sortCid(models, -1);
  },
  markdown: function(str) {
    // parse markdown to html

    return markdown.parse(str);
  },
  replace: function(str, other) {
    // replace string with other

    return str.replace(/{{(.*?)}}/, other);
  }
});

var LatestTipContentView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px',
  render: function() {
    // shows latest tip for home page

    var template = $('#latestTipContentTemplate').html();

    this.$el.html(this.replace(template, this.markdown(this.model.attributes.content)));

    return this;
  }
});

var LatestTipTimeView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px',
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
  className: 'line margin-top-64px',
  render: function() {
    // shows latest tip time created for home page

    var template = $('#latestTipTagTemplate').html();

    var compiled = Handlebars.compile(template);

    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});

var TagNameView = View.extend({
  tagName: 'li',
  className: 'lineList',
  render: function() {
    // show single tag name

    var template = $('#latestTipTagTemplate').html();

    var compiled = Handlebars.compile(template);

    var html = compiled(this.model);

    this.$el.html(html);

    return this;    
  }
});

var TagNamesView = View.extend({
  tagName: 'ul',
  className: 'margin-top-64px',
  render: function() {
    // show tag names for home page

    _.each(this.models, function(model) {
      tagNameView = new TagNameView();

      this.$el.append(tagNameView.set({model: model}).render().el);
    }, this);

    return this;
  }
});

var TagCreateLinkView = View.extend({
  tagName: 'div',
  className: 'centre margin-top-64px',
  render: function() {
    // show create tag link

    this.clear();

    this.$el.html($('#tagCreateLinkTemplate').html());

    return this; 
  }
});

var TagCreateFormView = View.extend({
  tagName: 'form',
  className: 'centre',
  events: {'submit': 'submit'},
  render: function() {
    // show tag create form

    this.clear();

    this.$el.html($('#tagCreateFormTemplate').html());

    return this;
  },
  submit: function(e) {
    // submit form for creating tag

    e.preventDefault();

    this.trigger('tag:create', this.formJson(this.$el.serializeArray()));
  }
});

var LatestTipView = View.extend({
  tagName: 'div',
  className: 'centre',
  render: function() {
    // show latest tip on home page

    this.clear();

    var model = this.collection.shift();

    var latestTipContentView = new LatestTipContentView();

    this.$el.append(latestTipContentView.set({model: model}).render().el);

    var latestTipTimeView = new LatestTipTimeView();

    this.$el.append(latestTipTimeView.set({model: model}).render().el);

    var latestTipTagView = new LatestTipTagView();

    this.$el.append(latestTipTagView.set({model: model}).render().el);

    this.collection.unshift(model);

    var tagNamesView = new TagNamesView();

    var models = this.unique(this.collection, 'tag');

    this.$el.append(tagNamesView.set({models: models}).render().el);

    var tagCreateLinkView = new TagCreateLinkView();

    this.$el.append(tagCreateLinkView.render().el);

    return this;
  }
});

var TipView = View.extend({
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

    var sorted = this.sortCidReverse(this.models);

    for(var i = 0, len = sorted.length; i < len; i++) {
      var tipView = new TipView();

      this.$el.append(tipView.set({model: sorted[i]}).render().el);
    }

    return this;
  }
});
