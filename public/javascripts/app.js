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