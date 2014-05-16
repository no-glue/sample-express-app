var CommentView = View.extend({
  tagName: 'li',
  render: function() {
    var html = $('#commentTemplate').html();

    var compiled = Handlebars.compile(html);

    this.$el.html(compiled(this.model.attributes));

    return this;
  }
});