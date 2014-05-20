var CommentButtonStripView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px',
  render: function() {
    // strip for comment button

    var commentButtonView = new CommentButtonView();

    this.$el.html(commentButtonView.set({model: this.model}).render().el);

    return this;
  }
});