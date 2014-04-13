var LatestTipReportView = View.extend({
  tagName: 'span',
  className: 'stripButton',
  render: function() {
    // shows latest tip time created for home page

    var template = $('#latestTipReportTemplate').html();

    var compiled = Handlebars.compile(template);

    var html = compiled(this.model.attributes);

    this.$el.html(html);

    return this;
  }
});