var LatestTipCommentsView = View.extend({
  tagName: 'span',
  className: 'stripButton',
  render: function() {
    // shows comments button

    var html = $('#latestTipCommentsTemplate').html();

    this.$el.html(html);

    this.$el.attr('data-id', this.model.attributes._id);

    return this;
  }
});