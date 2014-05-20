var CommentButtonView = View.extend({
  tagName: 'span',
  className: 'stripButton',
  render: function() {
    // shows comment button (for writing)

    var html = $('#commentButtonTemplate').html();

    var compiled = Handlebars.compile(html);

    this.$el.html(compiled(this.model.attributes));

    return this;
  }
});