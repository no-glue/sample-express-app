var CommentCreateFormView = View.extend({
  tagName: 'form',
  className: 'centre',
  events: {
    'submit': 'submit'
  },
  render: function() {
    // show comment create form

    var html = $('#commentCreateFormTemplate').html();

    var compiled = Handlebars.compile(html);

    this.$el.html(compiled(this.postId));

    return this;
  },
  submit: function(e) {
    // submit form to create comment

    e.preventDefault();

    this.trigger('comment:create', this.formJson(this.$el.serializeArray()));
  }
});