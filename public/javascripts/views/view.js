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
  replace: function(str, other, pattern) {
    // replace string with other

    var regex = {};

    regex = (pattern) ? new RegExp('{{' + pattern + '}}', 'g') : new RegExp('{{(.*?)}}', 'g');

    return str.replace(regex, other);
  },
  composite: function(model, fields) {
    // adds composites to model (e.g. concat all text fields)

    for(var key in fields) {
      var field = fields[key];

      var value = '';

      for(var i = 0, length = field.attributes.length; i < length; i++) {
        var attribute = field.attributes[i];

        value += model[attribute];
      }

      model[key] = value;
    }

    return model;
  },
  userSignedin: function(store) {
    // check if user signed in

    if(!store) store = signedin;

    return store().get().length;
  },
  getUserSignedin: function(store) {
    // get signed in user

    if(!store) store = signedin;

    return store().first();
  }
});