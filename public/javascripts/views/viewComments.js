var CommentsView = View.extend({
  tagName: 'div',
  className: 'centre',
  render: function() {
    // show comments

    this.clear();

    var loggedinStripView = new LoggedinStripView();

    this.$el.append(loggedinStripView.render().el);

    var sorted = this.sortCidReverse(this.models);

    for(var i = 0, len = sorted.length; i < len; i++) {
      var commentView = new CommentView();

      this.$el.append(commentView.set({model: sorted[i]}).render().el);

      var commentButtonStripView = new CommentButtonStripView();

      this.$el.append(commentButtonStripView.set({model: sorted[i]}).render().el);
    }

    return this;
  }
});