var usersControllerOptions = function(options) {
  // users controller options

  if(!options) {
    options = {
      collection: new UsersCollection(),
      userFetch: new UserFetch(),
      element: '#app'
    };
  };

  return options;
};