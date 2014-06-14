var extendControllerUsers = (function(extend, options) {
  // purpose // works with users
  // use // this // to make decisions about users

  extend.set(options);

  extend.initialize = function() {
    // initialize things

    extend.react('user:signin', extend.signedin);

    extend.react('user:signout', extend.signedout);

    return extend;
  };

  extend.fetchUser = function(email, password) {
    // fetch user according to email

    var deferred = extend.assure();

    extend.get('userFetch').set({email: email, password: password}).fetch({success: function(model, response) {
      deferred.resolve(response.pop());
    }});

    return deferred;
  };

  extend.cookie = function(name, val, expires, path) {
    // create cookie

    return {
      name: name,
      value: val,
      expires: (expires) ? expires : 1,
      path: (path) ? path : '/'
    };
  };

  extend.signedin = function(event) {
    // signed in

    var anotherDeferred = extend.fetchUser(event.email, event.password);

    anotherDeferred.then(function(arg) {
      if(arg) {
        extend.get('cookies').set(extend.cookie('user', JSON.stringify(arg)));

        extend.clearAndNavigate('home');
      } else {
        extend.get('collection').create(event, {
          wait: true,
          success: function(response) {
            extend.get('cookies').set(extend.cookie('user', JSON.stringify(response.toJSON())));

            extend.clearAndNavigate('home');
          }
        });
      }
    });
  };

  extend.signedout = function() {
    // user signedout

    extend.get('cookies').delete({
      name: 'user',
      path: '/'
    });

    extend.clearFragment();

    extend.navigate('home');
  };

  extend.initialize();

  return extend;
})(
  new Controller(),
  {
    assure: assure,
    selector: $,
    cookies: CookieJS,
    // common
    // todo don't repeat so much
    collection: new UsersCollection(),
    userFetch: new UserFetch(),
    element: '#app'
  }
);