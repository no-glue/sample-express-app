var UsersController = function() {
  var root = this;

  root.initialize = function() {
    // initialize things

    root.react('user:signin', root.signedin);

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

  root.react = function(event, handler, object, panel) {
    // react on event

    if(!object) object = root.get('root');

    if(!panel) panel = controlPanel;

    panel.getEvents().bind(event, handler, object);
  };

  root.signedin = function() {
    // signed in

    console.log('signedin>>>');
  };
};