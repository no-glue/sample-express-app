var CommentCreateFormView = View.extend({
  tagName: 'form',
  className: 'centre',
  render: function() {
    this.$el.html($('#commentCreateFormTemplate').html());

    return this;
  }
})