var usersControllerOptions = function(options) {
  // users controller options

  if(!options) {
    options = {
      collection: new UsersCollection(),
      userFetch: new UserFetch(),
      cookies: CookieJS,
      element: '#app'
    };
  };

  return options;
};