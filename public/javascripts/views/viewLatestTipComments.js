var LatestTipCommentsView = View.extend({
  tagName: 'span',
  className: 'stripButton',
  render: function() {
    // shows comments button

    var html = $('#latestTipCommentsTemplate').html();

    this.$el.html(html);

    return this;
  }
});