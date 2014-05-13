var LatestTipCommentsView = View.extend({
  tagName: 'span',
  className: 'stripButton',
  render: function() {
    // shows comments button

    var template = $('#latestTipCommentsTemplate').html();

    var compiled = Handlebars.compile(template);

    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});