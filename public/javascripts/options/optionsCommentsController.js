var commentsControllerOptions = function(options) {
  // comments controller options

  if(!options) {
    options = {
      collection: new CommentsCollection(),
      commentsView: new CommentsView(),
      commentCreateFormView: new CommentCreateFormView(),
      element: '#app',
    };
  }

  return options;
};