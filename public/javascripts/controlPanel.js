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