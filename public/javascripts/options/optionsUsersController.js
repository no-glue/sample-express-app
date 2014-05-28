var usersControllerOptions = function(options) {
  // users controller options

  if(!options) {
    options = {
      collection: new UsersCollection(),
      userSignedin: signedin,
      element: '#app'
    };
  };

  return options;
};