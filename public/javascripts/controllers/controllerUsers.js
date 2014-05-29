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

  root.fetch = function() {
    // fetches collection

    var deferred = root.assure();

    root.get('collection').fetch({reset: true, success: function(model, response) {
      deferred.resolve(model.lenght);
    }});

    return deferred;
  };

  root.fetchUser = function(email) {
    // fetch user according to email

    var deferred = root.assure();

    var userFetch = new UserFetch();

    userFetch.set({email: email}).fetch({success: function(model, response) {
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

  root.signedin = function(event) {
    // signed in

    var deferred = root.fetch();

    deferred.then(function(arg) {
      var password = event.email + event.password;

      var models = root.get('collection').where({password: password});

      if(models && models.length) {
        root.get('userSignedin').insert({user: models.pop().toJSON()});

        root.navigate('home');
      } else {
        // todo check if user exists remote side
        var anotherDeferred = root.fetchUser(event.email);

        anotherDeferred.then(function(arg) {
          root.get('userSignedin').insert({user: arg});

          root.navigate('home');
        });
      }
    });

    console.log('signedin>>>', event);
  };
};