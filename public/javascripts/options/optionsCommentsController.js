var commentsControllerOptions = function(options) {
  // comments controller options

  if(!options) {
    options = {
      collection: new CommentsCollection(),
      commentsView: new CommentsView(),
      element: '#app',
    };
  }

  return options;
};