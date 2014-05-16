var CommentView = View.extend({
  tagName: 'li',
  render: function() {
    this.$el.html(this.model.attributes.content);

    return this;
  }
});