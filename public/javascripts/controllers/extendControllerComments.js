var extendControllerComments = (function(extend, options) {
  // purpose // works with comments
  // use // this // to make decisions about comments
  
  extend.set(options);

  extend.initialize = function() {
    // initialize things
    // as in controllerTips e.g.

    extend.react('comment:create', extend.created);

    return extend;
  };

  extend.created = function(event) {
    // comment is created

    extend.get('collection').create(event, {
      wait: true,
      success: function(response) {
        extend.navigate('tags', ['comments', event.postId]);
      }
    });
  };

  extend.create = function(postId) {
    // create comment for tag
    if(extend.get('cookies').get('user') != undefined) {
      var deferred = extend.fetch();

      deferred.then(function(arg) {
        extend.get('selector')(extend.get('element')).html(extend.get('commentCreateFormView').set({postId: {postId: postId}}).render().el);
      });
    } else extend.clearAndNavigate('home');
  };

  extend.comments = function(postId) {
    // show comments for tag

    var models = extend.get('collection').where({postId: postId});

    if(models && models.length) {
      extend.get('selector')(extend.get('element')).html(extend.get('commentsView').set({models: models}).render().el);
    } else {
      var deferred = extend.fetch();

      deferred.then(function(arg) {
        var models = extend.get('collection').where({postId: postId});

        if(models && models.lenght) extend.get('selector')(extend.get('element')).html(extend.get('commentsView').set({models: models}).render().el);
        else extend.create(postId);
      }); 
    }
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
    collection: new CommentsCollection(),
    commentsView: new CommentsView(),
    commentCreateFormView: new CommentCreateFormView(),
    element: '#app'
  }
);