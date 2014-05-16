var CommentView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px code',
  render: function() {
    var html = $('#commentTemplate').html();

    var compiled = Handlebars.compile(html);

    this.$el.html(compiled(this.model.attributes));

    return this;
  }
});