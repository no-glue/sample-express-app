var usersControllerOptions = function(options) {
  // users controller options

  if(!options) {
    options = {
      collection: new UsersCollection(),
      element: '#app'
    };
  };

  return options;
};