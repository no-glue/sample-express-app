var LatestTipContentView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px',
  render: function() {
    // shows latest tip for home page

    var template = $('#latestTipContentTemplate').html();

    this.$el.html(this.replace(template, this.markdown(this.model.attributes.content)));

    return this;
  }
});