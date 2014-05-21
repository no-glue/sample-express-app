var CommentView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px code',
  render: function() {
    // show comment
    
    var html = $('#commentTemplate').html();

    this.$el.html(this.replace(html, this.markdown(this.model.attributes.content)));

    return this;
  }
});