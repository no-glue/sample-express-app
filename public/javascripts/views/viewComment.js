var CommentView = View.extend({
  tagName: 'li',
  render: function() {
    this.$el.html('item');

    return this;
  }
});