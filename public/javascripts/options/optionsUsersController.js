var usersControllerOptions = function(options) {
  // users controller options

  if(!options) {
    options = {
      collection: new UsersCollection(),
      cookies: CookieJS,
      element: '#app'
    };
  };

  return options;
};