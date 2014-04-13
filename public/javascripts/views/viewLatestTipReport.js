var LatestTipReportView = View.extend({
  tagName: 'span',
  className: 'stripButton',
  events: {
    'click a': 'report'
  },
  render: function() {
    // shows latest tip time created for home page

    var html = $('#latestTipReportTemplate').html();

    this.$el.html(html);

    this.$el.attr('data-id', this.model.attributes._id);

    return this;
  },
  report: function(e) {
    // trigger tip report

    e.preventDefault();

    this.trigger('tip:report', this.$el.attr('data-id'));
  }
});