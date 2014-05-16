var CommentsView = View.extend({
  tagName: 'div',
  className: 'centre',
  render: function() {
    for(var i = 0, len = this.models.length; i < len; i++) {
      var commentView = new CommentView();

      this.$el.append(commentView.set({model: this.models[i]}).render().el);
    }

    return this;
  }
});