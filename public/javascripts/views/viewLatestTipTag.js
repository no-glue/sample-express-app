var LatestTipTagView = View.extend({
  tagName: 'div',
  className: 'line margin-top-64px',
  render: function() {
    // shows latest tip time created for home page

    var template = $('#latestTipTagTemplate').html();

    var compiled = Handlebars.compile(template);

    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});