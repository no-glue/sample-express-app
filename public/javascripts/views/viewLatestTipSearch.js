var LatestTipSearchView = View.extend({
  tagName: 'span',
  className: 'stripButton',
  render: function() {
    // shows latest tip time created for home page

    var html = $('#latestTipSearchTemplate').html();

    this.$el.html(html);

    this.$el.attr('data-id', this.model.attributes._id);

    return this;
  }
});