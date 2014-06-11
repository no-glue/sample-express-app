var UsersController = function() {
  var root = this;

  root.initialize = function() {
    // initialize things

    root.react('user:signin', root.signedin);

    root.react('user:signout', root.signedout);

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

  root.fetchUser = function(email, password) {
    // fetch user according to email

    var deferred = root.assure();

    root.get('userFetch').set({email: email, password: password}).fetch({success: function(model, response) {
      deferred.resolve(response.pop());
    }});

    return deferred;
  };

  root.react = function(event, handler, object, panel) {
    // react on event

    if(!object) object = root.get('root');

    if(!panel) panel = controlPanel;

    panel.getEvents().bind(event, handler, object);
  };

  root.cookie = function(name, val, expires, path) {
    // create cookie

    return {
      name: name,
      value: val,
      expires: (expires) ? expires : 1,
      path: (path) ? path : '/'
    };
  };

  root.signedin = function(event) {
    // signed in

    var anotherDeferred = root.fetchUser(event.email, event.password);

    anotherDeferred.then(function(arg) {
      if(arg) {
        root.get('cookies').set(root.cookie('user', JSON.stringify(arg)));

        root.clearAndNavigate('home');
      } else {
        root.get('collection').create(event, {
          wait: true,
          success: function(response) {
            root.get('cookies').set(root.cookie('user', JSON.stringify(response.toJSON())));

            root.clearAndNavigate('home');
          }
        });
      }
    });
  };

  root.signedout = function() {
    // user signedout

    root.get('cookies').delete({
      name: 'user',
      path: '/'
    });

    root.clearFragment();

    root.navigate('home');
  };
};