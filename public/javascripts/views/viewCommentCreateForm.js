var CommentCreateFormView = View.extend({
  tagName: 'form',
  className: 'centre',
  events: {
    'submit': 'submit'
  },
  render: function() {
    // show comment create form

    this.$el.html($('#commentCreateFormTemplate').html());

    return this;
  },
  submit: function(e) {
    // submit form to create comment

    e.preventDefault();
  }
});