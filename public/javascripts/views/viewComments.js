var CommentsView = View.extend({
  tagName: 'ul',
  render: function() {
    var commentView = new CommentView();

    this.$el.append(commentView.render().el);

    return this;
  }
});