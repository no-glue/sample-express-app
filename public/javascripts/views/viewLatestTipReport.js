var LatestTipReportView = View.extend({
  tagName: 'span',
  className: 'stripButton',
  render: function() {
    // shows latest tip time created for home page

    var template = $('#latestTipReportTemplate').html();

    this.$el.html(template);

    return this;
  }
});