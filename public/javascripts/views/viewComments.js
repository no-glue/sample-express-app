var CommentsView = View.extend({
  tagName: 'div',
  className: 'centre',
  render: function() {
    this.$el.html('');
    
    for(var i = 0, len = this.models.length; i < len; i++) {
      var commentView = new CommentView();

      this.$el.append(commentView.set({model: this.models[i]}).render().el);

      var commentButtonStripView = new CommentButtonStripView();

      this.$el.append(commentButtonStripView.set({model: this.models[i]}).render().el);
    }

    return this;
  }
});